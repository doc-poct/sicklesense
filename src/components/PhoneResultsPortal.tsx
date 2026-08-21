import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  AndroidLogoIcon,
  ArrowClockwiseIcon,
  ArrowSquareOutIcon,
  BatteryChargingIcon,
  CheckCircleIcon,
  CodeBlockIcon,
  CpuIcon,
  DeviceMobileIcon,
  DownloadSimpleIcon,
  EyeIcon,
  FilePdfIcon,
  FilesIcon,
  HouseIcon,
  LinkBreakIcon,
  ListBulletsIcon,
  LockKeyIcon,
  MagnifyingGlassIcon,
  QuestionIcon,
  ShieldCheckIcon,
  SparkleIcon,
  UsbIcon,
  WarningCircleIcon,
  XIcon,
} from '@phosphor-icons/react'
import {
  PhoneExportError,
  WebUsbPhoneExport,
  type PhoneDeviceInfo,
  type PhoneExportConnectPhase,
  type PhoneResult,
  type PhoneResultDetail,
} from '@/phoneExport'
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
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'

type PortalStatus = 'idle' | 'connecting' | 'approval' | 'connected' | 'disconnected' | 'in_use' | 'preview'

const demoResults: PhoneResult[] = [
  {
    id: 'SS-2024-0514-001',
    patient_name: 'Aarav Sharma',
    patient_id: 'PT-BH-8831',
    status: 'completed',
    category: 'SickleSense',
    source: 'poct_box',
    created_at_ms: 1715663520000,
    exportable: true,
  },
  {
    id: 'SS-2024-0514-002',
    patient_name: 'Priya Patel',
    patient_id: 'PT-BH-8845',
    status: 'completed',
    category: 'SickleSense',
    source: 'poct_box',
    created_at_ms: 1715654100000,
    exportable: true,
  },
  {
    id: 'SS-2024-0513-018',
    patient_name: 'Devendra Verma',
    patient_id: 'PT-BH-8850',
    status: 'completed',
    category: 'SickleSense',
    source: 'mobile_app',
    created_at_ms: 1715597460000,
    exportable: true,
  },
  {
    id: 'QC-2024-0512-009',
    patient_name: 'Optical QC Calibration',
    patient_id: 'QC-CAL-099',
    status: 'completed',
    category: 'Control QC',
    source: 'poct_box',
    created_at_ms: 1715492280000,
    exportable: true,
  },
]

const demoDetails: Record<string, PhoneResultDetail> = {
  'SS-2024-0514-001': {
    ...demoResults[0],
    summary: {
      diagnostic_result: 'Sickle Cell Trait (HbAS)',
      sickling_ratio: '18.4%',
      deox_response: 'Moderate',
      cell_count: '1,420 cells',
      optical_quality: '98.2% (Pass)',
      test_duration: '42 seconds',
      device_serial: 'JD-POCT-0482',
    },
    artifacts: [
      { id: 'clinical-pdf', kind: 'Clinical Diagnostic Report (PDF)', mime: 'application/pdf' },
      { id: 'morphology-png', kind: 'Cell Morphology High-Res Micrograph', mime: 'image/png' },
      { id: 'telemetry-json', kind: 'Raw Sensor Telemetry (JSON)', mime: 'application/json' },
    ],
  },
  'SS-2024-0514-002': {
    ...demoResults[1],
    summary: {
      diagnostic_result: 'Sickle Cell Disease (HbSS)',
      sickling_ratio: '64.8%',
      deox_response: 'High Positive',
      cell_count: '1,680 cells',
      optical_quality: '99.1% (Pass)',
      test_duration: '38 seconds',
      device_serial: 'JD-POCT-0482',
    },
    artifacts: [
      { id: 'clinical-pdf', kind: 'Clinical Diagnostic Report (PDF)', mime: 'application/pdf' },
      { id: 'morphology-png', kind: 'Cell Morphology High-Res Micrograph', mime: 'image/png' },
      { id: 'telemetry-json', kind: 'Raw Sensor Telemetry (JSON)', mime: 'application/json' },
    ],
  },
  'SS-2024-0513-018': {
    ...demoResults[2],
    summary: {
      diagnostic_result: 'Normal Adult Hb (HbAA)',
      sickling_ratio: '0.2%',
      deox_response: 'Negative (Normal)',
      cell_count: '1,510 cells',
      optical_quality: '97.5% (Pass)',
      test_duration: '45 seconds',
      device_serial: 'MOBILE-CAM-0112',
    },
    artifacts: [
      { id: 'clinical-pdf', kind: 'Clinical Diagnostic Report (PDF)', mime: 'application/pdf' },
      { id: 'telemetry-json', kind: 'Raw Sensor Telemetry (JSON)', mime: 'application/json' },
    ],
  },
  'QC-2024-0512-009': {
    ...demoResults[3],
    summary: {
      diagnostic_result: 'Optical Self-Calibration Passed',
      led_flux: '850 lumens (Normal)',
      sensor_snr: '46.2 dB',
      focus_index: '0.992',
      dark_current: '12 mV',
      device_serial: 'JD-POCT-0482',
    },
    artifacts: [
      { id: 'telemetry-json', kind: 'Calibration Diagnostics Log (JSON)', mime: 'application/json' },
    ],
  },
}

function formatDate(value: number) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatSource(source: string) {
  return source === 'poct_box' ? 'POCT Device' : source === 'mobile_app' ? 'Mobile App' : source.replaceAll('_', ' ')
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

function PortalSidebar({
  resultCount,
  status,
  isDemo,
  onToggleDemo,
}: {
  resultCount: number
  status: PortalStatus
  isDemo: boolean
  onToggleDemo: (val: boolean) => void
}) {
  const items = [
    { label: 'Dashboard', href: '#dashboard', icon: HouseIcon },
    { label: 'Phone Connection', href: '#connection', icon: UsbIcon },
    { label: 'Completed Results', href: '#results', icon: ListBulletsIcon, badge: resultCount || undefined },
    { label: 'Help & Guides', href: '#first-time-guide', icon: QuestionIcon },
    { label: 'Back to Website', href: '../', icon: ArrowSquareOutIcon },
  ]

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border/60 px-4 py-4">
        <a className="flex items-center gap-3 overflow-hidden no-underline" href="../" aria-label="JeevDristi website">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <ShieldCheckIcon className="size-5" weight="fill" />
          </span>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-heading text-sm font-bold tracking-tight text-sidebar-foreground">
              JeevDristi
            </span>
            <span className="text-[10px] font-medium text-sidebar-foreground/60 uppercase">
              Web Portal
            </span>
          </div>
        </a>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    render={<a href={item.href} />}
                    isActive={item.label === 'Completed Results'}
                    tooltip={item.label}
                    className="h-9 text-xs font-medium"
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                    {item.badge ? (
                      <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 h-4 font-mono">
                        {item.badge}
                      </Badge>
                    ) : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60 p-4 group-data-[collapsible=icon]:p-2">
        {/* Demo Mode Toggle */}
        <div className="mb-3 flex items-center justify-between rounded-lg border border-sidebar-border/60 bg-sidebar-accent/30 p-2.5 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2">
            <SparkleIcon className="size-4 text-sidebar-primary" weight="fill" />
            <span className="text-xs font-medium text-sidebar-foreground">Demo Mode</span>
          </div>
          <Switch checked={isDemo} onCheckedChange={onToggleDemo} aria-label="Toggle Demo Mode" />
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-sidebar-border/70 bg-sidebar-accent/50 p-3 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sidebar-foreground">
            <LockKeyIcon className="size-3.5" />
            Zero-Cloud Privacy
          </div>
          <p className="text-[11px] leading-relaxed text-sidebar-foreground/70">
            P2P local connection. No server uploads. No browser storage. Direct ZIP export.
          </p>
        </div>

        <div className="mt-2 flex items-center gap-2 px-1 text-[11px] text-sidebar-foreground/70 group-data-[collapsible=icon]:justify-center">
          <span className="relative flex size-2">
            <span
              className={`absolute inline-flex size-full animate-ping rounded-full ${
                status === 'connected' ? 'bg-emerald-500' : isDemo ? 'bg-amber-500' : 'bg-primary'
              } opacity-75`}
            />
            <span
              className={`relative inline-flex size-2 rounded-full ${
                status === 'connected' ? 'bg-emerald-500' : isDemo ? 'bg-amber-500' : 'bg-primary'
              }`}
            />
          </span>
          <span className="truncate group-data-[collapsible=icon]:hidden">
            {status === 'connected'
              ? 'Secure session active'
              : isDemo
                ? 'Interactive Demo Mode'
                : status === 'in_use'
                  ? 'Phone in use elsewhere'
                  : 'Awaiting phone'}
          </span>
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

  const [isDemo, setIsDemo] = useState<boolean>(() => {
    return new URLSearchParams(location.search).get('preview') === 'dashboard'
  })

  const [status, setStatus] = useState<PortalStatus>(() => (isDemo ? 'preview' : 'idle'))
  const [code, setCode] = useState('')
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [results, setResults] = useState<PhoneResult[]>(() => (isDemo ? demoResults : []))
  const [deviceInfo, setDeviceInfo] = useState<PhoneDeviceInfo | null>(() =>
    isDemo
      ? {
          brand: 'Samsung',
          manufacturer: 'Samsung',
          model: 'Galaxy Tab Active4 Pro',
          android_version: '14',
          android_sdk: 34,
          battery_percent: 88,
          charging: true,
          network: 'Offline (Field Mode)',
          jeevdristi_version: '1.8.0',
        }
      : null
  )
  const [detail, setDetail] = useState<PhoneResultDetail | null>(() => (isDemo ? demoDetails['SS-2024-0514-001'] : null))
  const [artifactPreview, setArtifactPreview] = useState<string | null>(null)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [connectPhase, setConnectPhase] = useState<PhoneExportConnectPhase>('selecting')

  const supported = WebUsbPhoneExport.supported()
  const connected = status === 'connected'

  // Handle Demo Mode switch
  function handleToggleDemo(active: boolean) {
    setIsDemo(active)
    if (active) {
      if (client.current) {
        void client.current.close()
        client.current = null
      }
      setStatus('preview')
      setResults(demoResults)
      setDeviceInfo({
        brand: 'Samsung',
        manufacturer: 'Samsung',
        model: 'Galaxy Tab Active4 Pro',
        android_version: '14',
        android_sdk: 34,
        battery_percent: 88,
        charging: true,
        network: 'Offline (Field Mode)',
        jeevdristi_version: '1.8.0',
      })
      setDetail(demoDetails['SS-2024-0514-001'])
      setError('')
    } else {
      setStatus('idle')
      clearResultState()
    }
  }

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
      void WebUsbPhoneExport.grantedAccessory().then((device) => {
        grantedAccessory.current = device
      })
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
    setIsDemo(false)
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
        (phase) => {
          if (attempt === connectionAttempt.current) setConnectPhase(phase)
        },
        grantedAccessory.current,
        (device) => {
          grantedAccessory.current = device
        }
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
      setStatus(
        reason instanceof PhoneExportError && reason.code === 'session_in_use'
          ? 'in_use'
          : reason instanceof PhoneExportError && reason.code === 'disconnected'
            ? 'disconnected'
            : 'idle'
      )
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
    if (isDemo) {
      const q = query.toLowerCase().trim()
      const filtered = demoResults.filter(
        (r) =>
          r.patient_name.toLowerCase().includes(q) ||
          r.patient_id.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      )
      setResults(filtered)
      return
    }
    if (!client.current) return
    const page = await client.current.list(query.trim())
    setResults(page.results)
    setNextCursor(page.next_cursor)
    setDetail(null)
  }

  async function loadMore() {
    if (isDemo) return
    if (!client.current || !nextCursor) return
    const page = await client.current.list(query.trim(), nextCursor)
    setResults((current) => [...current, ...page.results])
    setNextCursor(page.next_cursor)
  }

  async function showResult(id: string) {
    if (isDemo) {
      setDetail(demoDetails[id] ?? demoDetails['SS-2024-0514-001'])
      setArtifactPreview(null)
      return
    }
    if (client.current) {
      const res = await client.current.detail(id)
      setDetail(res)
      setArtifactPreview(null)
    }
  }

  async function showArtifact(testId: string, artifactId: string) {
    if (isDemo) {
      // Demo simulated artifact preview
      const simulatedHtml = `
        <html>
          <body style="font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; background: #fff;">
            <div style="border-bottom: 2px solid #0f766e; padding-bottom: 12px; margin-bottom: 16px;">
              <h2 style="margin: 0; color: #0f766e;">JeevDristi SickleSense • Clinical Report</h2>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">IIT Bhilai Point-of-Care Testing Unit • Test ID: ${testId}</p>
            </div>
            <p><strong>Artifact Type:</strong> ${artifactId}</p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <h4 style="margin-top:0;">Diagnostic Summary</h4>
              <p style="font-size: 14px; margin: 4px 0;">Morphology Classification: <strong>Verified</strong></p>
              <p style="font-size: 14px; margin: 4px 0;">Cryptographic Hash: <code style="font-size: 11px;">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code></p>
            </div>
            <p style="font-size: 11px; color: #94a3b8;">Generated on-device without cloud connectivity.</p>
          </body>
        </html>
      `
      const blob = new Blob([simulatedHtml], { type: 'text/html' })
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
      previewUrl.current = URL.createObjectURL(blob)
      setArtifactPreview(previewUrl.current)
      return
    }

    if (!client.current) return
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
    const file = await client.current.artifact(testId, artifactId)
    previewUrl.current = URL.createObjectURL(file.blob)
    setArtifactPreview(previewUrl.current)
  }

  async function download(result: PhoneResult) {
    if (isDemo) {
      const mockContent = JSON.stringify(demoDetails[result.id] ?? result, null, 2)
      const blob = new Blob([mockContent], { type: 'application/json' })
      saveBlob(blob, `JeevDristi-Demo-Export-${result.id}.json`)
      return
    }
    if (!client.current) return
    const file = await client.current.exportResult(result.id)
    saveBlob(file.blob, file.filename ?? `JeevDristi-result-${result.id}.zip`)
  }

  const filteredResults = useMemo(() => {
    if (categoryFilter === 'all') return results
    return results.filter((r) => r.category.toLowerCase().includes(categoryFilter.toLowerCase()))
  }, [results, categoryFilter])

  const exportableCount = useMemo(() => filteredResults.filter((r) => r.exportable).length, [filteredResults])

  return (
    <TooltipProvider>
      <SidebarProvider style={{ '--sidebar-width': '16.5rem' } as CSSProperties}>
        <PortalSidebar
          resultCount={results.length}
          status={status}
          isDemo={isDemo}
          onToggleDemo={handleToggleDemo}
        />
        <SidebarInset id="dashboard" className="min-w-0 bg-muted/20">
          {/* Header */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/70 bg-background/90 px-4 backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-5" />
              <div>
                <p className="text-[11px] font-medium text-muted-foreground">JeevDristi / WebUSB Portal</p>
                <h1 className="font-heading text-base font-bold text-foreground sm:text-lg">
                  Phone Results Explorer
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Status Pill Badge */}
              <Badge
                variant={connected ? 'success' : isDemo ? 'warning' : 'secondary'}
                className="hidden gap-1.5 px-2.5 py-1 text-xs sm:flex"
              >
                {connected ? (
                  <>
                    <CheckCircleIcon className="size-3.5" weight="fill" />
                    <span>Live USB Connected</span>
                  </>
                ) : isDemo ? (
                  <>
                    <SparkleIcon className="size-3.5" weight="fill" />
                    <span>Demo Simulator Mode</span>
                  </>
                ) : (
                  <>
                    <LinkBreakIcon className="size-3.5" />
                    <span>No Phone Connected</span>
                  </>
                )}
              </Badge>

              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<a href="../" />}
              >
                <ArrowSquareOutIcon data-icon="inline-start" />
                Website
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
            {/* Demo Mode Notice */}
            {isDemo ? (
              <Alert className="border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200">
                <SparkleIcon className="size-4 text-amber-600 dark:text-amber-400" weight="fill" />
                <AlertTitle className="font-semibold">Interactive Demo Simulator Active</AlertTitle>
                <AlertDescription className="text-xs">
                  Viewing sample SickleSense patient diagnostic records ({exportableCount} exportable). You can search, filter categories, inspect clinical metrics, preview reports, and test file exports. Plug in an Android phone and click "Connect" below to switch to Live USB mode.
                </AlertDescription>
              </Alert>
            ) : null}

            {/* Unsupported Browser Warning */}
            {!supported ? (
              <Alert variant="destructive">
                <WarningCircleIcon className="size-4" />
                <AlertTitle>WebUSB API Unavailable</AlertTitle>
                <AlertDescription className="text-xs">
                  WebUSB requires a Chromium-based browser (Google Chrome, Microsoft Edge, Brave) served over HTTPS or localhost. Safari and Firefox do not support WebUSB.
                </AlertDescription>
              </Alert>
            ) : null}

            {/* Error Banner */}
            {error ? (
              <Alert variant="destructive">
                <WarningCircleIcon className="size-4" />
                <AlertTitle>Connection Notice</AlertTitle>
                <AlertDescription className="flex flex-col gap-1.5 text-xs">
                  <span>{error}</span>
                  {error.includes('WinUSB') ? (
                    <span className="opacity-90">
                      <strong>Windows Fix:</strong> <a href="https://github.com/pbatard/libwdi/releases/download/v1.5.1/zadig-2.9.exe" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-foreground">Download Zadig (.exe)</a> to bind the <em>WinUSB</em> driver to your Android device in AOA mode (see setup guide below).
                    </span>
                  ) : null}
                </AlertDescription>
              </Alert>
            ) : null}

            {/* Phone Connection Hub */}
            <Card id="connection" className="border-border/80 bg-card shadow-sm">
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold sm:text-lg">Android USB Connection Hub</CardTitle>
                    <CardDescription className="text-xs">
                      Zero-cloud, peer-to-peer data export over standard USB cable using Android Open Accessory (AOA).
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="hidden sm:inline-flex text-[10px] font-mono gap-1">
                    <UsbIcon className="size-3" /> AOA 2.0 Protocol
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="grid gap-6 pt-6 lg:grid-cols-12">
                {/* Left: Interactive State Visualizer */}
                <div className="flex flex-col justify-between gap-4 lg:col-span-7">
                  <div className="flex items-start gap-4">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <DeviceMobileIcon className="size-7" weight="duotone" />
                    </span>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-heading text-base font-bold text-foreground">
                          {connected
                            ? 'Android Phone Connected & Authenticated'
                            : status === 'approval'
                              ? 'Approve Matching Code on Phone'
                              : status === 'connecting'
                                ? 'Connecting to USB Device…'
                                : status === 'in_use'
                                  ? 'Phone Session In Use Elsewhere'
                                  : status === 'disconnected'
                                    ? 'USB Connection Terminated'
                                    : isDemo
                                      ? 'Demo Phone Simulator Connected'
                                      : 'Connect Your Android Phone'}
                        </h2>
                        {connected ? (
                          <Badge variant="success" className="text-[10px]">
                            Encrypted P2P
                          </Badge>
                        ) : null}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Read-only local transfer • No cloud intermediary • Physical PIN confirmation
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {connected ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => void run(disconnect)}
                            disabled={busy}
                          >
                            <LinkBreakIcon data-icon="inline-start" />
                            Disconnect Phone
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              onClick={() => void run(connect)}
                              disabled={!supported || busy || ['connecting', 'approval'].includes(status)}
                            >
                              {busy || status === 'connecting' ? (
                                <Spinner data-icon="inline-start" />
                              ) : (
                                <UsbIcon data-icon="inline-start" />
                              )}
                              {status === 'connecting'
                                ? connectPhase === 'selecting'
                                  ? 'Select phone in browser…'
                                  : connectPhase === 'preparing'
                                    ? 'Initializing USB AOA…'
                                    : 'Awaiting JeevDristi handshake…'
                                : 'Connect Android Phone'}
                            </Button>

                            {status === 'connecting' || status === 'approval' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => void cancelConnection()}
                              >
                                <XIcon data-icon="inline-start" />
                                Cancel
                              </Button>
                            ) : null}

                            {!isDemo && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleDemo(true)}
                              >
                                <SparkleIcon data-icon="inline-start" className="text-amber-500" />
                                Explore Demo Data
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {status === 'connecting' && connectPhase === 'selecting' ? (
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-primary">
                      💡 The browser USB device chooser is open. Select your connected Android phone to continue.
                    </div>
                  ) : null}
                </div>

                {/* Right: Code Approval or Quick Guide */}
                <div className="flex flex-col justify-center border-t border-border/50 pt-4 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                  {status === 'approval' ? (
                    <div className="rounded-xl border border-primary/40 bg-primary/5 p-5 text-center shadow-xs">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                        Matching Security Code
                      </span>
                      <p className="my-2 font-mono text-3xl font-extrabold tracking-[0.25em] text-primary">
                        {code}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Confirm this code inside <strong>JeevDristi</strong> on your phone, then verify with your screen PIN or biometric.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-foreground">Connection Instructions</span>
                      <ol className="list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
                        <li>Plug Android phone into computer via USB.</li>
                        <li>Open JeevDristi app &amp; select <strong>Web Portal</strong>.</li>
                        <li>Click <strong>Connect Android Phone</strong> above.</li>
                        <li>Verify matching 6-digit code on both screens.</li>
                      </ol>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Live Telemetry Bar (when connected or in demo) */}
            {deviceInfo ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4 border-border/70">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <AndroidLogoIcon className="size-5" weight="fill" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Connected Device</p>
                      <p className="text-xs font-semibold text-foreground">
                        {deviceInfo.brand || deviceInfo.manufacturer || 'Android'} {deviceInfo.model || 'Device'}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-border/70">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <BatteryChargingIcon className="size-5" weight="duotone" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Battery Level</p>
                      <p className="text-xs font-semibold text-foreground">
                        {typeof deviceInfo.battery_percent === 'number'
                          ? `${deviceInfo.battery_percent}% (${deviceInfo.charging ? 'Charging' : 'Battery'})`
                          : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-border/70">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <CpuIcon className="size-5" weight="duotone" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Android OS</p>
                      <p className="text-xs font-semibold text-foreground">
                        {deviceInfo.android_version ? `Android ${deviceInfo.android_version}` : 'Android'}
                        {deviceInfo.android_sdk ? ` (API ${deviceInfo.android_sdk})` : ''}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-border/70">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <ShieldCheckIcon className="size-5" weight="duotone" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">JeevDristi Build</p>
                      <p className="text-xs font-semibold text-foreground">
                        v{deviceInfo.jeevdristi_version || '1.8.0'} • Field Mode
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : null}

            {/* Results Section & Inspection Drawer */}
            <section id="results" className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
              {/* Results Table Panel */}
              <Card className="min-w-0 border-border/80 shadow-sm">
                <CardHeader className="border-b border-border/50 pb-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-base font-bold">Diagnostic Records</CardTitle>
                      <CardDescription className="text-xs">
                        Completed sickle cell tests approved by the signed-in operator.
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs font-mono">
                        {filteredResults.length} records found
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex min-w-0 flex-col gap-4 pt-4">
                  {/* Search and Category Filter Toolbar */}
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                      <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-9 text-xs"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') void run(search)
                        }}
                        placeholder="Search patient, test ID, category, or date..."
                        aria-label="Search records"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        aria-label="Filter by Category"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="h-7 rounded-md border border-input bg-background px-2.5 text-xs text-foreground outline-none focus:border-ring"
                      >
                        <option value="all">All Categories</option>
                        <option value="SickleSense">SickleSense</option>
                        <option value="Control QC">Control QC</option>
                      </select>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => void run(search)}
                        disabled={busy || (!connected && !isDemo)}
                      >
                        {busy ? <Spinner data-icon="inline-start" /> : <ArrowClockwiseIcon data-icon="inline-start" />}
                        Refresh
                      </Button>
                    </div>
                  </div>

                  {/* Data Table */}
                  <div className="overflow-x-auto rounded-lg border border-border/70">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/40">
                          <TableHead className="text-xs font-bold">Patient</TableHead>
                          <TableHead className="text-xs font-bold">Test ID</TableHead>
                          <TableHead className="text-xs font-bold">Category</TableHead>
                          <TableHead className="text-xs font-bold">Source</TableHead>
                          <TableHead className="text-xs font-bold">Timestamp</TableHead>
                          <TableHead className="text-xs font-bold">Status</TableHead>
                          <TableHead className="text-right text-xs font-bold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredResults.length ? (
                          filteredResults.map((result) => (
                            <TableRow
                              key={result.id}
                              data-state={detail?.id === result.id ? 'selected' : undefined}
                              className="cursor-pointer transition-colors hover:bg-muted/30 data-[state=selected]:bg-primary/5"
                              onClick={() => void run(() => showResult(result.id))}
                            >
                              <TableCell className="font-medium text-xs">
                                <div className="flex items-center gap-2.5">
                                  <span className="grid size-7 place-items-center rounded-full bg-primary/10 font-bold text-[10px] text-primary">
                                    {result.patient_name.charAt(0)}
                                  </span>
                                  <div>
                                    <span className="font-semibold text-foreground">{result.patient_name}</span>
                                    <span className="block font-mono text-[10px] text-muted-foreground">
                                      {result.patient_id}
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-[11px] text-muted-foreground">
                                {result.id}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={result.category === 'SickleSense' ? 'default' : 'secondary'}
                                  className="text-[10px]"
                                >
                                  {result.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {formatSource(result.source)}
                              </TableCell>
                              <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                                {formatDate(result.created_at_ms)}
                              </TableCell>
                              <TableCell>
                                <Badge variant="success" className="text-[10px]">
                                  {result.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div
                                  className="flex justify-end gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button
                                    size="icon-xs"
                                    variant="ghost"
                                    aria-label={`View ${result.id}`}
                                    onClick={() => void run(() => showResult(result.id))}
                                  >
                                    <EyeIcon className="size-3.5" />
                                  </Button>
                                  <Button
                                    size="icon-xs"
                                    variant="ghost"
                                    aria-label={`Download ${result.id}`}
                                    disabled={!result.exportable || busy}
                                    onClick={() => void run(() => download(result))}
                                  >
                                    <DownloadSimpleIcon className="size-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7}>
                              <Empty className="min-h-40 p-6">
                                <EmptyHeader>
                                  <EmptyMedia variant="icon">
                                    <FilesIcon className="size-8 text-muted-foreground" />
                                  </EmptyMedia>
                                  <EmptyTitle>
                                    {connected || isDemo ? 'No records match search' : 'No phone connected'}
                                  </EmptyTitle>
                                  <EmptyDescription className="text-xs">
                                    {connected || isDemo
                                      ? 'Try clearing the search query or changing category filters.'
                                      : 'Connect an Android device via USB or toggle Demo Mode in the sidebar.'}
                                  </EmptyDescription>
                                </EmptyHeader>
                              </Empty>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {nextCursor && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="self-center"
                      onClick={() => void run(loadMore)}
                      disabled={busy}
                    >
                      {busy ? <Spinner data-icon="inline-start" /> : null}
                      Load More Results
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Result Inspection & Detail Drawer */}
              <Card className="h-fit border-border/80 shadow-sm xl:sticky xl:top-20">
                <CardHeader className="border-b border-border/50 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-sm font-bold">Diagnostic Inspector</CardTitle>
                      <CardDescription className="font-mono text-[11px]">
                        {detail ? detail.id : 'Select a record to inspect'}
                      </CardDescription>
                    </div>
                    {detail && (
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        aria-label="Close inspector"
                        onClick={() => {
                          setDetail(null)
                          setArtifactPreview(null)
                        }}
                      >
                        <XIcon className="size-3.5" />
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 pt-4">
                  {detail ? (
                    <>
                      {/* Patient Summary Banner */}
                      <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-heading text-sm font-bold text-foreground">
                            {detail.patient_name}
                          </p>
                          <Badge variant="outline" className="text-[10px] font-mono">
                            {detail.patient_id}
                          </Badge>
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {formatDate(detail.created_at_ms)} • {formatSource(detail.source)}
                        </p>
                      </div>

                      {/* Tabs for Overview, Metrics, Artifacts */}
                      <Tabs defaultValue="summary" className="w-full">
                        <TabsList className="grid h-8 w-full grid-cols-2">
                          <TabsTrigger value="summary" className="text-xs">
                            Clinical Metrics
                          </TabsTrigger>
                          <TabsTrigger value="artifacts" className="text-xs">
                            Artifacts ({detail.artifacts.length})
                          </TabsTrigger>
                        </TabsList>

                        {/* Summary Metrics Tab */}
                        <TabsContent value="summary" className="mt-3 space-y-2">
                          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-lg border border-border/50 bg-card p-3 text-xs">
                            <dt className="text-muted-foreground">Test Category</dt>
                            <dd className="text-right font-medium text-foreground">{detail.category}</dd>
                            <dt className="text-muted-foreground">Source</dt>
                            <dd className="text-right font-medium text-foreground">{formatSource(detail.source)}</dd>

                            {Object.entries(detail.summary).map(([key, value]) => (
                              <span className="contents" key={key}>
                                <dt className="capitalize text-muted-foreground">
                                  {key.replaceAll('_', ' ')}
                                </dt>
                                <dd className="break-words text-right font-semibold text-foreground">
                                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                </dd>
                              </span>
                            ))}
                          </dl>
                        </TabsContent>

                        {/* Artifacts Tab */}
                        <TabsContent value="artifacts" className="mt-3 space-y-2">
                          <div className="flex flex-col gap-1.5">
                            {detail.artifacts.map((artifact) => (
                              <Button
                                key={artifact.id}
                                variant="outline"
                                size="sm"
                                className="h-8 justify-between text-xs"
                                disabled={busy}
                                onClick={() => void run(() => showArtifact(detail.id, artifact.id))}
                              >
                                <span className="truncate flex items-center gap-1.5">
                                  <FilePdfIcon className="size-3.5 text-primary shrink-0" />
                                  {artifact.kind}
                                </span>
                                <EyeIcon className="size-3 text-muted-foreground shrink-0" />
                              </Button>
                            ))}
                          </div>

                          {artifactPreview && (
                            <div className="mt-3 overflow-hidden rounded-lg border border-border">
                              <iframe
                                className="h-64 w-full bg-background"
                                src={artifactPreview}
                                title="Artifact preview"
                              />
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>

                      {/* Download Action */}
                      <Button
                        size="sm"
                        className="w-full font-semibold"
                        disabled={!detail.exportable || busy}
                        onClick={() => void run(() => download(detail))}
                      >
                        {busy ? <Spinner data-icon="inline-start" /> : <DownloadSimpleIcon data-icon="inline-start" />}
                        Download Verified ZIP
                      </Button>

                      <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <LockKeyIcon className="size-3 shrink-0" />
                        <span>Direct cryptographic transfer. No server retention.</span>
                      </p>
                    </>
                  ) : (
                    <Empty className="min-h-56 p-4">
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <EyeIcon className="size-6 text-muted-foreground" />
                        </EmptyMedia>
                        <EmptyTitle className="text-xs">No Record Selected</EmptyTitle>
                        <EmptyDescription className="text-[11px]">
                          Click on any row in the diagnostic table to inspect clinical parameters and artifacts.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* First-Time Setup Guide (Zadig & udev) */}
            <Card id="first-time-guide" className="border-border/70 bg-card">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <QuestionIcon className="size-4.5 text-primary" />
                  First-Time Driver &amp; Setup Guide
                </CardTitle>
                <CardDescription className="text-xs">
                  Required one-time setup for raw WebUSB communication on Windows and Linux workstations.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0 text-xs text-muted-foreground space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5 space-y-2">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <CpuIcon className="size-4 text-primary" />
                      Windows (One-time WinUSB Driver Association)
                    </p>
                    <ol className="list-decimal space-y-1 pl-4 text-[11px] leading-relaxed">
                      <li>
                        Download <a href="https://github.com/pbatard/libwdi/releases/download/v1.5.1/zadig-2.9.exe" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">Zadig (direct .exe)</a>.
                      </li>
                      <li>In Zadig, select <strong>Options → List All Devices</strong>.</li>
                      <li>Select your connected phone from the list, choose <strong>WinUSB</strong>, and click <strong>Replace Driver</strong>.</li>
                      <li>When connecting in AOA mode, assign <strong>WinUSB</strong> to the <em>Android Accessory</em> entry.</li>
                    </ol>
                  </div>

                  <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5 space-y-2">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <CodeBlockIcon className="size-4 text-primary" />
                      Linux (One-time udev Rule)
                    </p>
                    <p className="text-[11px] leading-relaxed">
                      Add a udev rule for Google AOA (VID <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">18d1</code>) in <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">/etc/udev/rules.d/51-android.rules</code>:
                    </p>
                    <pre className="overflow-x-auto rounded bg-muted/60 p-2 font-mono text-[10px] text-foreground">
                      SUBSYSTEM=="usb", ATTR&#123;idVendor&#125;=="18d1", MODE="0666", GROUP="plugdev"
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
