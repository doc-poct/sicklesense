/** Patient-scoped SCST research presentation. Export transport remains generic. */
export function scstSummary(summary: Record<string, unknown>): [string, string][] | null {
  if (summary.schema_version !== 'scst.analysis.v1') return null
  const pair = summary.pair && typeof summary.pair === 'object' && !Array.isArray(summary.pair)
    ? summary.pair as Record<string, unknown> : {}
  const version = typeof summary.algorithm_version === 'string' ? summary.algorithm_version : 'unknown'
  const measured = pair.measurement_state === 'measured'
  const loss = pair.paired_modulation_loss
  const value = measured && typeof loss === 'number' && Number.isFinite(loss)
    ? `${loss.toFixed(4)} (dimensionless)` : 'Unavailable'
  return [
    ['Method', `JeevDristi SCST-LMA v${version} · Research`],
    ['Measurement', typeof pair.measurement_state === 'string' ? pair.measurement_state : 'incomplete'],
    ['Paired modulation loss', value],
    ['Interpretation', 'Clinical interpretation not established'],
    ['Protocol', 'AIIMS paired buffers · draft 0.1.0'],
    ['Biological controls', 'Not validated'],
  ]
}
