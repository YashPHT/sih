import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  Package,
  QrCode,
  CheckCircle,
  XCircle,
  Info,
  Link2,
  Shield,
  Clock,
  MapPin,
  User,
  Sprout,
  Droplets,
  Leaf,
  FlaskConical,
  Boxes,
  Truck,
  Store,
  AlertTriangle,
  Plus
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TraceabilityBatch, SupplyChainEventType, BlockchainVerification } from '../types'
import { mockBatches } from '../data/traceabilityData'
import { verifyChain, createEventHash, generateBatchId } from '../utils/blockchain'

const eventIcons: Record<SupplyChainEventType, LucideIcon> = {
  planting: Sprout,
  'growth-monitoring': Leaf,
  'pest-treatment': AlertTriangle,
  irrigation: Droplets,
  fertilization: FlaskConical,
  harvesting: Package,
  processing: Boxes,
  'quality-inspection': CheckCircle,
  packaging: Package,
  distribution: Truck,
  'retail-delivery': Store
}

const eventColors: Record<SupplyChainEventType, string> = {
  planting: 'text-green-600 bg-green-50',
  'growth-monitoring': 'text-emerald-600 bg-emerald-50',
  'pest-treatment': 'text-amber-600 bg-amber-50',
  irrigation: 'text-blue-600 bg-blue-50',
  fertilization: 'text-purple-600 bg-purple-50',
  harvesting: 'text-yellow-600 bg-yellow-50',
  processing: 'text-indigo-600 bg-indigo-50',
  'quality-inspection': 'text-teal-600 bg-teal-50',
  packaging: 'text-cyan-600 bg-cyan-50',
  distribution: 'text-orange-600 bg-orange-50',
  'retail-delivery': 'text-pink-600 bg-pink-50'
}

export default function Traceability() {
  const [batches, setBatches] = useState<TraceabilityBatch[]>(mockBatches)
  const [selectedBatch, setSelectedBatch] = useState<TraceabilityBatch | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)
  const [verification, setVerification] = useState<BlockchainVerification | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'verification'>('overview')
  const [showCreateBatch, setShowCreateBatch] = useState(false)
  const [newBatchData, setNewBatchData] = useState({
    crop: '',
    quantity: '',
    originFarm: '',
    actor: ''
  })

  useEffect(() => {
    if (selectedBatch) {
      verifyBatch(selectedBatch)
    }
  }, [selectedBatch])

  const verifyBatch = async (batch: TraceabilityBatch) => {
    const result = await verifyChain(batch.events)
    setVerification(result)
  }

  const handleCreateBatch = async () => {
    if (!newBatchData.crop || !newBatchData.quantity || !newBatchData.originFarm || !newBatchData.actor) {
      return
    }

    const batchId = generateBatchId()
    const timestamp = new Date().toISOString()
    const genesisHash = '0000000000000000000000000000000000000000000000000000000000000000'

    const firstEventHash = await createEventHash(
      batchId,
      'planting',
      timestamp,
      newBatchData.originFarm,
      newBatchData.actor,
      {
        seedVariety: 'Generic',
        fieldArea: 'Not specified',
        soilType: 'Not specified',
        soilPH: 'Not specified'
      },
      genesisHash
    )

    const newBatch: TraceabilityBatch = {
      id: String(batches.length + 1),
      batchNumber: batchId,
      crop: newBatchData.crop,
      quantity: newBatchData.quantity,
      originFarm: newBatchData.originFarm,
      createdAt: timestamp,
      status: 'active',
      isVerified: true,
      events: [
        {
          id: `evt-${Date.now()}`,
          batchId,
          eventType: 'planting',
          timestamp,
          location: newBatchData.originFarm,
          actor: newBatchData.actor,
          data: {
            seedVariety: 'Generic',
            fieldArea: 'Not specified',
            soilType: 'Not specified',
            soilPH: 'Not specified'
          },
          previousHash: genesisHash,
          currentHash: firstEventHash,
          blockNumber: 0
        }
      ]
    }

    setBatches([...batches, newBatch])
    setSelectedBatch(newBatch)
    setShowCreateBatch(false)
    setNewBatchData({ crop: '', quantity: '', originFarm: '', actor: '' })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatEventType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Link2 className="h-10 w-10" />
              <h1 className="text-3xl font-bold">Blockchain Traceability</h1>
            </div>
            <p className="text-emerald-50 text-lg">
              Farm-to-Fork Supply Chain Verification System
            </p>
          </div>
          <button
            onClick={() => setShowCreateBatch(true)}
            className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Batch</span>
          </button>
        </div>
      </div>

      {showCreateBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Batch</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  value={newBatchData.crop}
                  onChange={(e) => setNewBatchData({ ...newBatchData, crop: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Organic Tomatoes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="text"
                  value={newBatchData.quantity}
                  onChange={(e) => setNewBatchData({ ...newBatchData, quantity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., 1000 kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Origin Farm</label>
                <input
                  type="text"
                  value={newBatchData.originFarm}
                  onChange={(e) => setNewBatchData({ ...newBatchData, originFarm: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Sunshine Farm, Karnataka"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Name</label>
                <input
                  type="text"
                  value={newBatchData.actor}
                  onChange={(e) => setNewBatchData({ ...newBatchData, actor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., John Doe (Farmer)"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleCreateBatch}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
                >
                  Create Batch
                </button>
                <button
                  onClick={() => {
                    setShowCreateBatch(false)
                    setNewBatchData({ crop: '', quantity: '', originFarm: '', actor: '' })
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              How Blockchain Traceability Works
            </h3>
            <p className="text-blue-800 mb-3">
              Each step in the supply chain creates a unique cryptographic "block" containing:
            </p>
            <ul className="list-disc list-inside text-blue-700 space-y-1 mb-3">
              <li><strong>Event Data:</strong> Details about what happened (planting, harvesting, etc.)</li>
              <li><strong>Timestamp:</strong> When the event occurred</li>
              <li><strong>Actor:</strong> Who performed the action</li>
              <li><strong>Previous Hash:</strong> Link to the previous event's unique fingerprint</li>
              <li><strong>Current Hash:</strong> This event's unique cryptographic fingerprint</li>
            </ul>
            <p className="text-blue-800 mb-2">
              Each block's hash is calculated from its data plus the previous block's hash, creating an unbreakable chain. 
              Any tampering with past records breaks the chain and is immediately detected during verification.
            </p>
            <div className="flex items-center space-x-2 text-sm text-blue-700 mt-3">
              <Shield className="h-4 w-4" />
              <span className="font-medium">This ensures complete transparency and prevents fraud in the supply chain.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Package className="h-6 w-6 text-emerald-600" />
            <span>Available Batches</span>
          </h2>
          {batches.map((batch) => (
            <div
              key={batch.id}
              onClick={() => {
                setSelectedBatch(batch)
                setShowQRCode(false)
                setActiveTab('overview')
              }}
              className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition hover:shadow-lg border-2 ${
                selectedBatch?.id === batch.id ? 'border-emerald-500' : 'border-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{batch.crop}</h3>
                {batch.isVerified ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-1">{batch.quantity}</p>
              <p className="text-xs text-gray-500">{batch.originFarm}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  batch.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {batch.status === 'active' ? 'In Progress' : 'Completed'}
                </span>
                <span className="text-xs text-gray-500">{batch.events.length} events</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedBatch ? (
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedBatch.crop}</h2>
                  <button
                    onClick={() => setShowQRCode(!showQRCode)}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                  >
                    <QrCode className="h-5 w-5" />
                    <span>{showQRCode ? 'Hide' : 'Show'} QR Code</span>
                  </button>
                </div>
                <p className="text-sm text-gray-600">Batch: {selectedBatch.batchNumber}</p>
              </div>

              {showQRCode && (
                <div className="border-b border-gray-200 px-6 py-6 bg-gray-50">
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-700 mb-3">Scan to view full traceability</p>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <QRCodeSVG
                        value={JSON.stringify({
                          batchId: selectedBatch.batchNumber,
                          crop: selectedBatch.crop,
                          url: `https://agri-trace.example.com/batch/${selectedBatch.batchNumber}`
                        })}
                        size={200}
                        level="H"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center max-w-xs">
                      Consumers can scan this QR code to view the complete journey of this product
                    </p>
                  </div>
                </div>
              )}

              <div className="border-b border-gray-200">
                <div className="flex space-x-1 px-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 font-medium transition ${
                      activeTab === 'overview'
                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className={`px-4 py-3 font-medium transition ${
                      activeTab === 'events'
                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Event Timeline
                  </button>
                  <button
                    onClick={() => setActiveTab('verification')}
                    className={`px-4 py-3 font-medium transition ${
                      activeTab === 'verification'
                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Blockchain Verification
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Quantity</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedBatch.quantity}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Origin</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedBatch.originFarm}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Created</p>
                        <p className="text-lg font-semibold text-gray-900">{formatDate(selectedBatch.createdAt)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <p className="text-lg font-semibold text-gray-900 capitalize">{selectedBatch.status}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Supply Chain Summary</h3>
                      <div className="space-y-2">
                        {selectedBatch.events.map((event, index) => {
                          const Icon = eventIcons[event.eventType]
                          return (
                            <div key={event.id} className="flex items-center space-x-3">
                              <div className={`p-2 rounded-full ${eventColors[event.eventType]}`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{formatEventType(event.eventType)}</p>
                                <p className="text-sm text-gray-500">{formatDate(event.timestamp)}</p>
                              </div>
                              {index < selectedBatch.events.length - 1 && (
                                <div className="w-8 h-px bg-gray-300"></div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {verification && (
                      <div className={`rounded-lg p-4 ${
                        verification.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {verification.isValid ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span className={`font-semibold ${verification.isValid ? 'text-green-900' : 'text-red-900'}`}>
                            Verification Status
                          </span>
                        </div>
                        <p className={verification.isValid ? 'text-green-700' : 'text-red-700'}>
                          {verification.message}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'events' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Chronological Event Timeline
                    </h3>
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      <div className="space-y-6">
                        {selectedBatch.events.map((event) => {
                          const Icon = eventIcons[event.eventType]
                          return (
                            <div key={event.id} className="relative pl-16">
                              <div className={`absolute left-0 p-3 rounded-full ${eventColors[event.eventType]} border-4 border-white`}>
                                <Icon className="h-6 w-6" />
                              </div>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="font-semibold text-gray-900 text-lg">
                                      {formatEventType(event.eventType)}
                                    </h4>
                                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                                      <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{formatDate(event.timestamp)}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                    Block #{event.blockNumber}
                                  </span>
                                </div>
                                <div className="space-y-2 mt-3">
                                  <div className="flex items-start space-x-2">
                                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                    <span className="text-sm text-gray-700">{event.location}</span>
                                  </div>
                                  <div className="flex items-start space-x-2">
                                    <User className="h-4 w-4 text-gray-500 mt-0.5" />
                                    <span className="text-sm text-gray-700">{event.actor}</span>
                                  </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <p className="text-sm font-medium text-gray-700 mb-2">Event Details:</p>
                                  <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(event.data).map(([key, value]) => (
                                      <div key={key} className="text-sm">
                                        <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                        <span className="text-gray-900 ml-1 font-medium">{String(value)}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'verification' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Blockchain Hash Chain Verification
                      </h3>
                      {verification && (
                        <div className={`rounded-lg p-4 mb-6 ${
                          verification.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}>
                          <div className="flex items-center space-x-2 mb-2">
                            {verification.isValid ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : (
                              <XCircle className="h-6 w-6 text-red-600" />
                            )}
                            <span className={`font-bold text-lg ${verification.isValid ? 'text-green-900' : 'text-red-900'}`}>
                              {verification.message}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <p className="text-sm text-gray-600">Total Blocks</p>
                              <p className="text-2xl font-bold text-gray-900">{verification.totalBlocks}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Invalid Blocks</p>
                              <p className="text-2xl font-bold text-gray-900">{verification.invalidBlocks.length}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Hash Chain Details</h4>
                      <div className="space-y-3">
                        {selectedBatch.events.map((event, index) => (
                          <div key={event.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">Block #{event.blockNumber}</span>
                                <span className="text-xs text-gray-500">|</span>
                                <span className="text-sm text-gray-700">{formatEventType(event.eventType)}</span>
                              </div>
                              {verification?.invalidBlocks.includes(event.blockNumber) ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-gray-600 mb-1">Previous Hash:</p>
                                <p className="text-xs font-mono bg-white px-2 py-1 rounded border border-gray-200 break-all">
                                  {event.previousHash}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600 mb-1">Current Hash:</p>
                                <p className="text-xs font-mono bg-white px-2 py-1 rounded border border-gray-200 break-all">
                                  {event.currentHash}
                                </p>
                              </div>
                            </div>
                            {index < selectedBatch.events.length - 1 && (
                              <div className="flex items-center justify-center mt-3">
                                <div className="flex items-center space-x-2 text-emerald-600">
                                  <div className="w-4 h-px bg-emerald-600"></div>
                                  <Link2 className="h-4 w-4" />
                                  <div className="w-4 h-px bg-emerald-600"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">How Hash Chain Verification Works:</p>
                          <p>Each block's hash is calculated from its data plus the previous block's hash. This creates an unbreakable chain where any tampering with historical data would immediately be detected, as it would break the hash chain continuity.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Select a batch to view its traceability details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
