import { SupplyChainEvent, BlockchainVerification } from '../types'

export async function generateHash(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export async function createEventHash(
  batchId: string,
  eventType: string,
  timestamp: string,
  location: string,
  actor: string,
  data: Record<string, string | number | boolean>,
  previousHash: string
): Promise<string> {
  const eventData = JSON.stringify({
    batchId,
    eventType,
    timestamp,
    location,
    actor,
    data,
    previousHash
  })
  return await generateHash(eventData)
}

export async function verifyChain(events: SupplyChainEvent[]): Promise<BlockchainVerification> {
  if (events.length === 0) {
    return {
      isValid: true,
      totalBlocks: 0,
      invalidBlocks: [],
      message: 'No blocks to verify'
    }
  }

  const invalidBlocks: number[] = []

  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    
    const calculatedHash = await createEventHash(
      event.batchId,
      event.eventType,
      event.timestamp,
      event.location,
      event.actor,
      event.data,
      event.previousHash
    )

    if (calculatedHash !== event.currentHash) {
      invalidBlocks.push(event.blockNumber)
    }

    if (i > 0 && event.previousHash !== events[i - 1].currentHash) {
      invalidBlocks.push(event.blockNumber)
    }
  }

  const isValid = invalidBlocks.length === 0

  return {
    isValid,
    totalBlocks: events.length,
    invalidBlocks,
    message: isValid 
      ? '✓ All blocks verified. Chain integrity maintained.'
      : `✗ Chain compromised. ${invalidBlocks.length} invalid block(s) detected.`
  }
}

export function generateBatchId(): string {
  return `BATCH-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}
