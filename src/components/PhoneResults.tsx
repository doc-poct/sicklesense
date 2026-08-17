import { useEffect, useRef, useState } from 'react'
import { WebUsbPhoneExport, type PhoneDeviceInfo, type PhoneResult, type PhoneResultDetail } from '../phoneExport'

export function PhoneResults() {
  const client = useRef<WebUsbPhoneExport | null>(null)
  const previewUrl = useRef<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'connecting' | 'approval' | 'connected'>('idle')
  const [code, setCode] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PhoneResult[]>([])
  const [deviceInfo, setDeviceInfo] = useState<PhoneDeviceInfo | null>(null)
  const [detail, setDetail] = useState<PhoneResultDetail | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState('')
  const supported = WebUsbPhoneExport.supported()

  async function run(action: () => Promise<void>) {
    setError('')
    try { await action() } catch (reason) { setError(reason instanceof Error ? reason.message : 'The USB request failed.') }
  }

  useEffect(() => () => {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
    void client.current?.close()
  }, [])

  async function connect() {
    setError(''); setStatus('connecting')
    const next = new WebUsbPhoneExport()
    try {
      await next.connect((shortCode) => { setCode(shortCode); setStatus('approval') })
      client.current = next
      setStatus('connected')
      const [page, info] = await Promise.all([
        next.list(),
        next.deviceInfo().catch(() => undefined),
      ])
      setResults(page.results)
      setDeviceInfo(info ?? null)
    } catch (reason) {
      await next.close(); setStatus('idle')
      setError(reason instanceof Error ? reason.message : 'Could not connect to the phone.')
    }
  }

  async function search(value: string) { setQuery(value); if (client.current) setResults((await client.current.list(value)).results) }
  async function showResult(id: string) { if (client.current) setDetail(await client.current.detail(id)) }
  async function showArtifact(testId: string, artifactId: string) {
    if (!client.current) return
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
    const file = await client.current.artifact(testId, artifactId)
    previewUrl.current = URL.createObjectURL(file.blob); setPreview(previewUrl.current)
  }
  async function download(result: PhoneResult) {
    if (!client.current) return
    const file = await client.current.exportResult(result.id)
    const url = URL.createObjectURL(file.blob); const link = document.createElement('a')
    link.href = url; link.download = file.filename ?? `JeevDristi-result-${result.id}.zip`; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  return <section className="mx-auto w-full max-w-[94rem] px-8 py-24 max-md:px-5 max-md:py-17" id="phone-results">
    <div className="section-heading"><h2>Results from your phone.</h2><span aria-hidden="true" /></div>
    <p className="mt-8 max-w-[780px] text-lg leading-8 text-muted">Connect a supported Android phone by USB, keep JeevDristi open, and approve the matching code. Results stay between this browser and your phone.</p>
    {!supported && <p className="mt-6 rounded-xl bg-[#fff1f2] p-5 text-[#a52323]" role="alert">WebUSB is unavailable. Open this HTTPS page in a current Chrome or Edge browser.</p>}
    {supported && status === 'idle' && <button className="button button-primary mt-7" onClick={() => void run(connect)}>Connect Android phone</button>}
    {status === 'connecting' && <p className="mt-7 font-semibold">Select your phone in the browser USB prompt. If Android reconnects in accessory mode, approve the second browser prompt too.</p>}
    {status === 'approval' && <div className="mt-7 rounded-2xl bg-teal-soft p-6"><p className="m-0">Confirm this code in JeevDristi, then approve with your phone PIN or biometric:</p><p className="mt-3 mb-0 text-4xl font-bold tracking-[.3em]">{code}</p></div>}
    {error && <p className="mt-6 rounded-xl bg-[#fff1f2] p-5 text-[#a52323]" role="alert">{error}</p>}
    {status === 'connected' && <div className="mt-8">{deviceInfo && <div className="mb-6 grid gap-4 rounded-2xl border border-line p-5 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-sm text-muted">Phone</p><p className="font-semibold">{deviceInfo.brand || deviceInfo.manufacturer || 'Android'} {deviceInfo.model || 'phone'}</p></div><div><p className="text-sm text-muted">Android</p><p className="font-semibold">{deviceInfo.android_version ? `Android ${deviceInfo.android_version}` : 'Unavailable'}{deviceInfo.android_sdk ? ` (API ${deviceInfo.android_sdk})` : ''}</p></div><div><p className="text-sm text-muted">Battery</p><p className="font-semibold">{typeof deviceInfo.battery_percent === 'number' ? `${deviceInfo.battery_percent}%${deviceInfo.charging ? ' · Charging' : ''}` : 'Unavailable'}</p></div><div><p className="text-sm text-muted">Network</p><p className="font-semibold">{deviceInfo.network || 'Unavailable'}</p><p className="text-sm text-muted">JeevDristi {deviceInfo.jeevdristi_version || 'version unavailable'}</p></div></div>}<label className="font-semibold" htmlFor="phone-result-search">Search completed results</label><input className="mt-2 w-full rounded-xl border border-line p-4" id="phone-result-search" value={query} onChange={(event) => void run(() => search(event.target.value))} placeholder="Patient, test, category, date or status" /><div className="mt-5 overflow-x-auto"><table className="w-full border-collapse"><thead><tr><th className="p-3 text-left">Patient</th><th className="p-3 text-left">Test</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Actions</th></tr></thead><tbody>{results.map((result) => <tr className="border-t border-line" key={result.id}><td className="p-3">{result.patient_name}<br /><span className="text-sm text-muted">{result.patient_id}</span></td><td className="p-3">{result.id}</td><td className="p-3">{result.status}</td><td className="flex gap-2 p-3"><button className="button download-secondary" onClick={() => void run(() => showResult(result.id))}>View</button><button className="button button-primary" disabled={!result.exportable} onClick={() => void run(() => download(result))}>Download ZIP</button></td></tr>)}</tbody></table></div></div>}
    {detail && <div className="mt-8 rounded-2xl border border-line p-6"><h3 className="text-2xl font-bold">{detail.patient_name} · {detail.id}</h3><pre className="mt-4 overflow-auto whitespace-pre-wrap">{JSON.stringify(detail.summary, null, 2)}</pre><div className="mt-4 flex flex-wrap gap-3">{detail.artifacts.map((artifact) => <button className="button download-secondary" key={artifact.id} onClick={() => void run(() => showArtifact(detail.id, artifact.id))}>Preview {artifact.kind}</button>)}</div>{preview && <iframe className="mt-6 min-h-[34rem] w-full rounded-xl border border-line" src={preview} title="Result artifact preview" />}</div>}
  </section>
}
