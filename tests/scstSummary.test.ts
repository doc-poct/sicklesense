import { describe, expect, test } from 'bun:test'
import { scstSummary } from '../src/scstSummary'

describe('SCST research summaries over unchanged Phone Export Link v1', () => {
  test('preserves negative indices and does not render nested identities or clinical heuristics', () => {
    const rows = scstSummary({ schema_version: 'scst.analysis.v1', algorithm_version: '0.1.0',
      pair: { measurement_state: 'measured', paired_modulation_loss: -0.25,
        observations: [{ specimen_id: 'PRIVATE_NESTED_ID' }] }, probability: .99 })
    expect(rows).toContainEqual(['Paired modulation loss', '-0.2500 (dimensionless)'])
    expect(rows).toContainEqual(['Interpretation', 'Clinical interpretation not established'])
    expect(JSON.stringify(rows)).not.toContain('PRIVATE_NESTED_ID')
    expect(JSON.stringify(rows)).not.toContain('probability')
  })
  test('legacy summaries keep their existing renderer', () => {
    expect(scstSummary({ schema_version: 'turbidity.single_tube.v3' })).toBeNull()
  })
  test('missing, malformed and ungradable indices remain unavailable', () => {
    for (const pair of [null, [], { measurement_state: 'measured', paired_modulation_loss: NaN },
      { measurement_state: 'ungradable', paired_modulation_loss: .5 }]) {
      expect(scstSummary({ schema_version: 'scst.analysis.v1', pair }))
        .toContainEqual(['Paired modulation loss', 'Unavailable'])
    }
  })
})
