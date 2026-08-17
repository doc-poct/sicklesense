import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  ArrowClockwiseIcon,
  ArrowSquareOutIcon,
  CheckCircleIcon,
  DeviceMobileIcon,
  DownloadSimpleIcon,
  EyeIcon,
  FilesIcon,
  HouseIcon,
  LinkBreakIcon,
  ListBulletsIcon,
  LockKeyIcon,
  MagnifyingGlassIcon,
  QuestionIcon,
  ShieldCheckIcon,
  UsbIcon,
  WarningCircleIcon,
  XIcon,
} from '@phosphor-icons/react'
import { PhoneExportError, WebUsbPhoneExport, type PhoneDeviceInfo, type PhoneExportConnectPhase, type PhoneResult, type PhoneResultDetail } from '@/phoneExport'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Spinner } from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TooltipProvider } from '@/components/ui/tooltip'

type PortalStatus = 'idle' | 'connecting' | 'approval' | 'connected' | 'disconnected' | 'in_use' | 'preview'

const previewResults: PhoneResult[] = [
  { id: 'DEMO-240514-001', patient_name: 'Demonstration A', patient_id: 'DEMO-001', status: 'completed', category: 'SickleSense', source: 'poct_box', created_at_ms: 1715663520000, exportable: true },
  { id: 'DEMO-240513-017', patient_name: 'Demonstration B', patient_id: 'DEMO-002', status: 'completed', category: 'SickleSense', source: 'mobile_app', created_at_ms: 1715597460000, exportable: true },
  { id: 'DEMO-240512-009', patient_name: 'Demonstration C', patient_id: 'DEMO-003', status: 'completed', category: 'SickleSense', source: 'poct_box', created_at_ms: 1715492280000, exportable: false },
]

const previewDetail: PhoneResultDetail = {
  ...previewResults[0],
  summary: { result: 'Demonstration only', workflow: 'POCT box', integrity: 'Verified on phone' },
  artifacts: [
    { id: 'demo-report', kind: 'PDF report', mime: 'application/pdf' },
    { id: 'demo-summary', kind: 'Result summary', mime: 'application/json' },
  ],
}

function formatDate(value: number) {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function formatSource(source: string) {
  return source === 'poct_box' ? 'POCT box' : source === 'mobile_app' ? 'Mobile app' : source.replaceAll('_', ' ')
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

function PortalSidebar({ resultCount, status }: { resultCount: number; status: PortalStatus }) {
  const items = [
    { label: 'Dashboard', href: '#dashboard', icon: HouseIcon },
    { label: 'Phone connection', href: '#connection', icon: UsbIcon },
    { label: 'Results', href: '#results', icon: ListBulletsIcon, badge: resultCount || undefined },
    { label: 'Downloads', href: '#results', icon: DownloadSimpleIcon },
    { label: 'Help', href: '../#workflow', icon: QuestionIcon },
  ]

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="px-4 py-5">
        <a className="flex items-center gap-3 overflow-hidden" href="../" aria-label="JeevDristi website">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"><ShieldCheckIcon weight="fill" /></span>
          <span className="font-heading text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">JeevDristi</span>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton render={<a href={item.href} />} isActive={item.label === 'Phone connection'} tooltip={item.label} className="h-10 text-sm">
                    <item.icon />
                    <span>{item.label}</span>
                    {item.badge ? <span className="ml-auto text-xs tabular-nums">{item.badge}</span> : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex flex-col gap-2 rounded-md border border-sidebar-border/70 bg-sidebar-accent/50 p-3 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2 text-sm font-medium"><LockKeyIcon /> Privacy & security</div>
          <p className="text-xs leading-relaxed text-sidebar-foreground/70">Read-only local access. No upload or browser storage. ZIP downloads are the only persistent output.</p>
        </div>
        <div className="flex items-center gap-2 px-2 text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-sidebar-primary opacity-50" /><span className="relative inline-flex size-2 rounded-full bg-sidebar-primary" /></span>
          <span className="group-data-[collapsible=icon]:hidden">{status === 'connected' ? 'Secure session active' : status === 'preview' ? 'Dashboard preview' : status === 'in_use' ? 'Phone in use elsewhere' : 'Phone not connected'}</span>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export function PhoneResultsPortal() {
  const client = useRef<WebUsbPhoneExport | null>(null)
  const connectionAttempt = useRef(0)
  const grantedAccessory = useRef<USBDevice | undefined>(undefined)
  const previewUrl = useRef<string | null>(null)
  const [status, setStatus] = useState<PortalStatus>(() => new URLSearchParams(location.search).get('preview') === 'dashboard' ? 'preview' : 'idle')
  const [code, setCode] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PhoneResult[]>(() => status === 'preview' ? previewResults : [])
  const [deviceInfo, setDeviceInfo] = useState<PhoneDeviceInfo | null>(null)
  const [detail, setDetail] = useState<PhoneResultDetail | null>(() => status === 'preview' ? previewDetail : null)
  const [artifactPreview, setArtifactPreview] = useState<string | null>(null)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [connectPhase, setConnectPhase] = useState<PhoneExportConnectPhase>('selecting')
  const supported = WebUsbPhoneExport.supported()
  const connected = status === 'connected'
  const exportableCount = useMemo(() => results.filter((result) => result.exportable).length, [results])

  function clearResultState() {
    setResults([])
    setDeviceInfo(null)
    setDetail(null)
    setNextCursor(null)
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
    previewUrl.current = null
    setArtifactPreview(null)
  }

  useEffect(() => {
    const rememberGrantedAccessory = () => {
      void WebUsbPhoneExport.grantedAccessory().then((device) => { grantedAccessory.current = device })
    }
    const rememberConnectedAccessory = (event: USBConnectionEvent) => {
      if (WebUsbPhoneExport.isAccessory(event.device)) grantedAccessory.current = event.device
    }
    const forgetDisconnectedAccessory = (event: USBConnectionEvent) => {
      if (event.device === grantedAccessory.current) grantedAccessory.current = undefined
    }
    const endPageSession = () => {
      const active = client.current
      client.current = null
      void active?.close(false)
    }
    rememberGrantedAccessory()
    navigator.usb?.addEventListener('connect', rememberConnectedAccessory)
    navigator.usb?.addEventListener('disconnect', forgetDisconnectedAccessory)
    window.addEventListener('pagehide', endPageSession)
    return () => {
      navigator.usb?.removeEventListener('connect', rememberConnectedAccessory)
      navigator.usb?.removeEventListener('disconnect', forgetDisconnectedAccessory)
      window.removeEventListener('pagehide', endPageSession)
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
      endPageSession()
    }
  }, [])

  async function run(action: () => Promise<void>) {
    setError('')
    setBusy(true)
    try {
      await action()
    } catch (reason) {
      if (reason instanceof PhoneExportError && reason.code === 'disconnected') {
        const active = client.current
        client.current = null
        void active?.close(false)
        clearResultState()
        setStatus('disconnected')
      }
      setError(reason instanceof Error ? reason.message : 'The USB request failed.')
    } finally {
      setBusy(false)
    }
  }

  async function connect() {
    if (client.current) return
    const attempt = ++connectionAttempt.current
    setStatus('connecting')
    setConnectPhase('selecting')
    const next = new WebUsbPhoneExport()
    client.current = next
    next.onDisconnect(() => {
      if (client.current !== next) return
      client.current = null
      setStatus('disconnected')
      clearResultState()
      setBusy(false)
      setError('The USB cable or phone connection was lost. Reconnect and approve a new secure session.')
    })
    try {
      await next.connect(
        (shortCode) => {
          if (attempt !== connectionAttempt.current) return
          setCode(shortCode)
          setStatus('approval')
        },
        (phase) => { if (attempt === connectionAttempt.current) setConnectPhase(phase) },
        grantedAccessory.current,
        (device) => { grantedAccessory.current = device },
      )
      if (attempt !== connectionAttempt.current) return
      const [page, info] = await Promise.all([
        next.list(),
        next.deviceInfo().catch(() => undefined),
      ])
      if (attempt !== connectionAttempt.current) return
      setResults(page.results)
      setNextCursor(page.next_cursor)
      setDeviceInfo(info ?? null)
      setStatus('connected')
    } catch (reason) {
      if (attempt !== connectionAttempt.current) return
      if (client.current === next) client.current = null
      await next.close()
      setStatus(reason instanceof PhoneExportError && reason.code === 'session_in_use' ? 'in_use' : reason instanceof PhoneExportError && reason.code === 'disconnected' ? 'disconnected' : 'idle')
      throw reason
    }
  }

  async function cancelConnection() {
    connectionAttempt.current += 1
    const active = client.current
    client.current = null
    setBusy(false)
    setError('')
    setStatus('idle')
    await active?.close(false)
  }

  async function disconnect() {
    await client.current?.close()
    client.current = null
    setStatus('idle')
    clearResultState()
  }

  async function search() {
    if (!client.current) return
    const page = await client.current.list(query.trim())
    setResults(page.results)
    setNextCursor(page.next_cursor)
    setDetail(null)
  }

  async function loadMore() {
    if (!client.current || !nextCursor) return
    const page = await client.current.list(query.trim(), nextCursor)
    setResults((current) => [...current, ...page.results])
    setNextCursor(page.next_cursor)
  }

  async function showResult(id: string) {
    if (status === 'preview') {
      const result = previewResults.find((candidate) => candidate.id === id)
      if (result) setDetail({ ...previewDetail, ...result })
      return
    }
    if (client.current) setDetail(await client.current.detail(id))
  }

  async function showArtifact(testId: string, artifactId: string) {
    if (status === 'preview') return
    if (!client.current) return
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
    const file = await client.current.artifact(testId, artifactId)
    previewUrl.current = URL.createObjectURL(file.blob)
    setArtifactPreview(previewUrl.current)
  }

  async function download(result: PhoneResult) {
    if (status === 'preview') return
    if (!client.current) return
    const file = await client.current.exportResult(result.id)
    saveBlob(file.blob, file.filename ?? `JeevDristi-result-${result.id}.zip`)
  }

  return (
    <TooltipProvider>
      <SidebarProvider style={{ '--sidebar-width': '16.5rem' } as CSSProperties}>
        <PortalSidebar resultCount={results.length} status={status} />
        <SidebarInset id="dashboard" className="min-w-0 bg-muted/30">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-5" />
              <div>
                <p className="text-xs text-muted-foreground">Phone connection / Results</p>
                <h1 className="font-heading text-lg font-semibold leading-tight">Phone Results</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={connected ? 'default' : 'secondary'} className="hidden gap-1.5 sm:flex">
                {connected ? <CheckCircleIcon weight="fill" /> : <LinkBreakIcon />}
                {connected ? 'Phone connected' : status === 'preview' ? 'Preview mode' : 'Not connected'}
              </Badge>
              <Button variant="outline" nativeButton={false} render={<a href="../" />}><ArrowSquareOutIcon data-icon="inline-start" />Website</Button>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 p-4 sm:p-6 lg:p-8">
            {status === 'preview' ? (
              <Alert><WarningCircleIcon /><AlertTitle>Dashboard preview</AlertTitle><AlertDescription>These are demonstration records. Connect a phone to view real completed results.</AlertDescription></Alert>
            ) : null}
            {!supported ? (
              <Alert variant="destructive"><WarningCircleIcon /><AlertTitle>WebUSB is unavailable</AlertTitle><AlertDescription>Open this HTTPS page in a current Chrome or Edge browser on a computer.</AlertDescription></Alert>
            ) : null}
            {error ? (
              <Alert variant="destructive"><WarningCircleIcon /><AlertTitle>Connection or transfer failed</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
            ) : null}

            <Card id="connection">
              <CardHeader className="border-b">
                <CardTitle>Android phone connection</CardTitle>
                <CardDescription>Results stay between this browser and your phone.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,.8fr)]">
                <div className="flex items-center gap-5">
                  <span className="grid size-16 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><DeviceMobileIcon className="size-8" weight="duotone" /></span>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-heading text-base font-semibold">{connected ? 'Android phone connected via USB' : status === 'approval' ? 'Approve this secure session' : status === 'in_use' ? 'Phone is in use elsewhere' : status === 'disconnected' ? 'Phone connection ended' : status === 'preview' ? 'Dashboard demonstration' : 'Connect your Android phone'}</h2>
                      {connected ? <Badge>Secure session active</Badge> : null}
                    </div>
                    <p className="text-sm text-muted-foreground">Read-only access • Local connection • No server upload • No browser storage</p>
                    <div className="flex flex-wrap gap-2">
                      {connected ? (
                        <Button variant="outline" onClick={() => void run(disconnect)} disabled={busy}><LinkBreakIcon data-icon="inline-start" />Disconnect</Button>
                      ) : status !== 'preview' ? (
                        <>
                          <Button onClick={() => void run(connect)} disabled={!supported || busy || !['idle', 'disconnected', 'in_use'].includes(status)}>
                            {busy || status === 'connecting' ? <Spinner data-icon="inline-start" /> : <UsbIcon data-icon="inline-start" />}
                            {status === 'connecting' ? connectPhase === 'selecting' ? 'Select phone in browser…' : connectPhase === 'preparing' ? 'Preparing USB connection…' : 'Waiting for JeevDristi…' : status === 'approval' ? 'Waiting for approval…' : 'Connect Android phone'}
                          </Button>
                          {status === 'connecting' || status === 'approval' ? <Button variant="outline" onClick={() => void cancelConnection()}><XIcon data-icon="inline-start" />Cancel</Button> : null}
                        </>
                      ) : null}
                    </div>
                    {status === 'connecting' && connectPhase === 'selecting' ? <p className="text-xs text-muted-foreground">The browser device chooser should be open. If it is not visible, cancel and retry while keeping this tab active.</p> : null}
                  </div>
                </div>
                <div className="flex flex-col gap-3 border-t pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                  {status === 'approval' ? (
                    <div className="rounded-lg border bg-primary/5 p-4">
                      <p className="text-xs font-medium text-muted-foreground">MATCHING CODE</p>
                      <p className="mt-2 font-heading text-3xl font-semibold tracking-[0.25em] text-primary">{code}</p>
                      <p className="mt-2 text-sm">Confirm this code in JeevDristi, then approve with your phone PIN or biometric.</p>
                    </div>
                  ) : (
                    <>
                      <p className="font-heading text-sm font-medium">How to connect</p>
                      <ol className="flex list-decimal flex-col gap-1 pl-5 text-sm text-muted-foreground">
                        <li>Connect the Android phone with a USB cable.</li>
                        <li>Open JeevDristi and choose Web Portal.</li>
                        <li>Select the phone in the browser prompt.</li>
                        <li>Match the six-digit code and approve on the phone.</li>
                      </ol>
                      <p className="text-xs leading-relaxed text-muted-foreground"><strong className="font-medium text-foreground">One secure session at a time.</strong> Refreshing, closing this tab, changing browser, or disconnecting the cable ends the session. Reconnect here and approve a new code on the phone; sessions never resume automatically.</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <section className="grid gap-4 sm:grid-cols-3" aria-label="Session summary">
              <Card size="sm"><CardHeader><CardDescription>Available results</CardDescription><CardTitle className="text-2xl tabular-nums">{results.length}</CardTitle></CardHeader><CardContent className="flex items-center gap-2 text-muted-foreground"><FilesIcon />Completed on this phone</CardContent></Card>
              <Card size="sm"><CardHeader><CardDescription>Exportable results</CardDescription><CardTitle className="text-2xl tabular-nums">{exportableCount}</CardTitle></CardHeader><CardContent className="flex items-center gap-2 text-muted-foreground"><DownloadSimpleIcon />Ready for verified ZIP</CardContent></Card>
              <Card size="sm"><CardHeader><CardDescription>Session security</CardDescription><CardTitle className="text-base">{connected ? 'Encrypted and active' : status === 'preview' ? 'Preview only' : 'Awaiting connection'}</CardTitle></CardHeader><CardContent className="flex items-center gap-2 text-muted-foreground"><LockKeyIcon />Read-only and local</CardContent></Card>
            </section>

            {connected && deviceInfo ? <Card id="device-info">
              <CardHeader className="border-b"><CardTitle>Connected phone</CardTitle><CardDescription>Live, non-identifying status from JeevDristi. This page does not store it.</CardDescription></CardHeader>
              <CardContent className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                <div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{deviceInfo.brand || deviceInfo.manufacturer || 'Android'} {deviceInfo.model || 'phone'}</p></div>
                <div><p className="text-xs text-muted-foreground">Android</p><p className="font-medium">{deviceInfo.android_version ? `Android ${deviceInfo.android_version}` : 'Unavailable'}{deviceInfo.android_sdk ? ` (API ${deviceInfo.android_sdk})` : ''}</p></div>
                <div><p className="text-xs text-muted-foreground">Battery</p><p className="font-medium">{typeof deviceInfo.battery_percent === 'number' ? `${deviceInfo.battery_percent}%${deviceInfo.charging ? ' · Charging' : ''}` : 'Unavailable'}</p></div>
                <div><p className="text-xs text-muted-foreground">Network</p><p className="font-medium">{deviceInfo.network || 'Unavailable'}</p><p className="mt-1 text-xs text-muted-foreground">JeevDristi {deviceInfo.jeevdristi_version || 'version unavailable'}</p></div>
              </CardContent>
            </Card> : null}

            <section id="results" className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
              <Card className="min-w-0">
                <CardHeader className="border-b">
                  <CardTitle>Completed results</CardTitle>
                  <CardDescription>Search, inspect, and export results approved by the signed-in phone operator.</CardDescription>
                </CardHeader>
                <CardContent className="flex min-w-0 flex-col gap-4">
                  <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(event) => { event.preventDefault(); void run(search) }}>
                    <div className="relative flex-1">
                      <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patient, test, category, date, or status" aria-label="Search completed results" disabled={!connected} />
                    </div>
                    <Button type="submit" variant="outline" disabled={!connected || busy}>{busy ? <Spinner data-icon="inline-start" /> : <MagnifyingGlassIcon data-icon="inline-start" />}Search</Button>
                    <Button type="button" variant="outline" onClick={() => void run(search)} disabled={!connected || busy}><ArrowClockwiseIcon data-icon="inline-start" />Refresh</Button>
                  </form>
                  <div className="overflow-x-auto rounded-md border">
                    <Table>
                      <TableHeader><TableRow><TableHead>Patient</TableHead><TableHead>Test ID</TableHead><TableHead>Category</TableHead><TableHead>Source</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                      <TableBody>
                        {results.length ? results.map((result) => (
                          <TableRow key={result.id} data-state={detail?.id === result.id ? 'selected' : undefined}>
                            <TableCell className="font-medium">{result.patient_name}<span className="block text-xs font-normal text-muted-foreground">{result.patient_id}</span></TableCell>
                            <TableCell className="font-mono text-xs">{result.id}</TableCell>
                            <TableCell>{result.category}</TableCell>
                            <TableCell>{formatSource(result.source)}</TableCell>
                            <TableCell className="whitespace-nowrap">{formatDate(result.created_at_ms)}</TableCell>
                            <TableCell><Badge variant="secondary">{result.status}</Badge></TableCell>
                            <TableCell><div className="flex justify-end gap-1"><Button size="icon" variant="ghost" aria-label={`View ${result.id}`} onClick={() => void run(() => showResult(result.id))}><EyeIcon /></Button><Button size="icon" variant="ghost" aria-label={`Download ${result.id}`} disabled={!result.exportable || busy || status === 'preview'} onClick={() => void run(() => download(result))}><DownloadSimpleIcon /></Button></div></TableCell>
                          </TableRow>
                        )) : (
                          <TableRow><TableCell colSpan={7}><Empty className="min-h-32 p-4"><EmptyHeader><EmptyMedia variant="icon"><FilesIcon /></EmptyMedia><EmptyTitle>{connected ? 'No matching results' : 'No phone connected'}</EmptyTitle><EmptyDescription>{connected ? 'Try a broader search.' : 'Connect an approved Android phone to list completed results.'}</EmptyDescription></EmptyHeader></Empty></TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  {nextCursor ? <Button variant="outline" className="self-center" onClick={() => void run(loadMore)} disabled={busy}>{busy ? <Spinner data-icon="inline-start" /> : null}Load more results</Button> : null}
                </CardContent>
              </Card>

              <Card className="h-fit xl:sticky xl:top-21">
                <CardHeader className="border-b">
                  <div className="flex items-start justify-between gap-3">
                    <div><CardTitle>Result details</CardTitle><CardDescription>{detail ? detail.id : 'Select a completed result'}</CardDescription></div>
                    {detail ? <Button size="icon-sm" variant="ghost" aria-label="Close result details" onClick={() => { setDetail(null); setArtifactPreview(null) }}><XIcon /></Button> : null}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {detail ? (
                    <>
                      <div><p className="font-heading text-base font-semibold">{detail.patient_name}</p><p className="text-xs text-muted-foreground">{detail.patient_id} • {formatDate(detail.created_at_ms)}</p></div>
                      <Separator />
                      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-xs">
                        <dt className="text-muted-foreground">Category</dt><dd className="text-right font-medium">{detail.category}</dd>
                        <dt className="text-muted-foreground">Source</dt><dd className="text-right font-medium">{formatSource(detail.source)}</dd>
                        {Object.entries(detail.summary).slice(0, 5).map(([key, value]) => <span className="contents" key={key}><dt className="capitalize text-muted-foreground">{key.replaceAll('_', ' ')}</dt><dd className="break-words text-right font-medium">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</dd></span>)}
                      </dl>
                      <Separator />
                      <div className="flex flex-col gap-2"><p className="font-heading text-sm font-medium">Artifacts ({detail.artifacts.length})</p>{detail.artifacts.map((artifact) => <Button key={artifact.id} variant="outline" className="justify-between" disabled={status === 'preview' || busy} onClick={() => void run(() => showArtifact(detail.id, artifact.id))}><span className="truncate">{artifact.kind}</span><EyeIcon data-icon="inline-end" /></Button>)}</div>
                      {artifactPreview ? <iframe className="min-h-80 w-full rounded-md border bg-background" src={artifactPreview} title="Result artifact preview" /> : null}
                      <Button size="lg" disabled={!detail.exportable || status === 'preview' || busy} onClick={() => void run(() => download(detail))}>{busy ? <Spinner data-icon="inline-start" /> : <DownloadSimpleIcon data-icon="inline-start" />}Download verified ZIP</Button>
                      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><LockKeyIcon className="mt-0.5 shrink-0" />The ZIP is transferred directly from the phone and checked before download. Nothing is uploaded or stored by this page.</p>
                    </>
                  ) : (
                    <Empty className="min-h-64 p-4"><EmptyHeader><EmptyMedia variant="icon"><EyeIcon /></EmptyMedia><EmptyTitle>No result selected</EmptyTitle><EmptyDescription>Choose View on a result to inspect its summary and available artifacts.</EmptyDescription></EmptyHeader></Empty>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
