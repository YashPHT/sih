import { TraceabilityBatch } from '../types'

export const mockBatches: TraceabilityBatch[] = [
  {
    id: '1',
    batchNumber: 'BATCH-1729788000000-ABC123XYZ',
    crop: 'Organic Wheat',
    quantity: '5000 kg',
    originFarm: 'Green Valley Farm, Punjab',
    createdAt: '2024-10-15T08:00:00Z',
    status: 'completed',
    isVerified: true,
    events: [
      {
        id: 'evt-1',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'planting',
        timestamp: '2024-10-15T08:00:00Z',
        location: 'Green Valley Farm, Punjab',
        actor: 'Rajesh Kumar (Farmer)',
        data: {
          seedVariety: 'HD-2967',
          fieldArea: '2 hectares',
          soilType: 'Loamy',
          soilPH: '7.2'
        },
        previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
        currentHash: '3f8a9c7e2d1b6f4a8e9c7d5b3a2f1e8c9d7b5a3f2e1d9c8b7a6f5e4d3c2b1a0',
        blockNumber: 0
      },
      {
        id: 'evt-2',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'irrigation',
        timestamp: '2024-10-25T06:30:00Z',
        location: 'Green Valley Farm, Punjab',
        actor: 'Rajesh Kumar (Farmer)',
        data: {
          method: 'Drip Irrigation',
          waterVolume: '12000 liters',
          duration: '6 hours'
        },
        previousHash: '3f8a9c7e2d1b6f4a8e9c7d5b3a2f1e8c9d7b5a3f2e1d9c8b7a6f5e4d3c2b1a0',
        currentHash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        blockNumber: 1
      },
      {
        id: 'evt-3',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'fertilization',
        timestamp: '2024-11-05T07:00:00Z',
        location: 'Green Valley Farm, Punjab',
        actor: 'Rajesh Kumar (Farmer)',
        data: {
          fertilizerType: 'Organic Compost',
          quantity: '500 kg',
          npkRatio: '10-10-10'
        },
        previousHash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        currentHash: 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
        blockNumber: 2
      },
      {
        id: 'evt-4',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'growth-monitoring',
        timestamp: '2024-11-20T09:00:00Z',
        location: 'Green Valley Farm, Punjab',
        actor: 'Dr. Priya Sharma (Agricultural Officer)',
        data: {
          plantHeight: '45 cm',
          healthStatus: 'Excellent',
          leafColor: 'Deep Green',
          pestObservations: 'None detected'
        },
        previousHash: 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
        currentHash: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
        blockNumber: 3
      },
      {
        id: 'evt-5',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'harvesting',
        timestamp: '2024-12-10T05:00:00Z',
        location: 'Green Valley Farm, Punjab',
        actor: 'Rajesh Kumar (Farmer)',
        data: {
          harvestMethod: 'Mechanical Combine',
          actualYield: '5200 kg',
          moisture: '12%',
          quality: 'Grade A'
        },
        previousHash: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
        currentHash: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
        blockNumber: 4
      },
      {
        id: 'evt-6',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'quality-inspection',
        timestamp: '2024-12-11T10:00:00Z',
        location: 'Punjab Quality Testing Lab',
        actor: 'Inspector Ramesh Singh',
        data: {
          proteinContent: '12.5%',
          glutenContent: 'High',
          contaminants: 'None',
          certification: 'Organic India Certified'
        },
        previousHash: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
        currentHash: 'e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',
        blockNumber: 5
      },
      {
        id: 'evt-7',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'processing',
        timestamp: '2024-12-13T08:00:00Z',
        location: 'Punjab Grain Mill',
        actor: 'Mill Operator Suresh Patel',
        data: {
          processType: 'Milling & Cleaning',
          outputWeight: '5000 kg',
          byproducts: '200 kg bran',
          temperature: '25°C'
        },
        previousHash: 'e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',
        currentHash: 'f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7',
        blockNumber: 6
      },
      {
        id: 'evt-8',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'packaging',
        timestamp: '2024-12-14T11:00:00Z',
        location: 'Punjab Grain Mill',
        actor: 'Packaging Team Lead Anjali Verma',
        data: {
          packageType: '25 kg bags',
          totalPackages: '200 bags',
          batchLabeling: 'QR Code + Barcode',
          expiryDate: '2025-12-14'
        },
        previousHash: 'f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7',
        currentHash: 'a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
        blockNumber: 7
      },
      {
        id: 'evt-9',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'distribution',
        timestamp: '2024-12-15T06:00:00Z',
        location: 'Delhi Distribution Center',
        actor: 'Logistics Manager Vikram Malhotra',
        data: {
          vehicle: 'Refrigerated Truck RT-1234',
          temperature: '20°C',
          distance: '450 km',
          eta: '2024-12-15T18:00:00Z'
        },
        previousHash: 'a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
        currentHash: 'b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9',
        blockNumber: 8
      },
      {
        id: 'evt-10',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'retail-delivery',
        timestamp: '2024-12-15T17:30:00Z',
        location: 'Fresh Organic Store, Delhi',
        actor: 'Store Manager Neha Kapoor',
        data: {
          receivedQuantity: '5000 kg (200 bags)',
          storageCondition: 'Climate Controlled Warehouse',
          shelfPlacement: 'Organic Section',
          retailPrice: '₹45/kg'
        },
        previousHash: 'b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9',
        currentHash: 'c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0',
        blockNumber: 9
      }
    ]
  },
  {
    id: '2',
    batchNumber: 'BATCH-1730480000000-DEF456UVW',
    crop: 'Basmati Rice',
    quantity: '3000 kg',
    originFarm: 'Golden Fields, Haryana',
    createdAt: '2024-10-20T09:00:00Z',
    status: 'active',
    isVerified: true,
    events: [
      {
        id: 'evt-11',
        batchId: 'BATCH-1730480000000-DEF456UVW',
        eventType: 'planting',
        timestamp: '2024-10-20T09:00:00Z',
        location: 'Golden Fields, Haryana',
        actor: 'Harpreet Singh (Farmer)',
        data: {
          seedVariety: 'Pusa Basmati 1509',
          fieldArea: '1.5 hectares',
          soilType: 'Clay loam',
          soilPH: '7.0'
        },
        previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
        currentHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        blockNumber: 0
      },
      {
        id: 'evt-12',
        batchId: 'BATCH-1730480000000-DEF456UVW',
        eventType: 'irrigation',
        timestamp: '2024-11-02T07:00:00Z',
        location: 'Golden Fields, Haryana',
        actor: 'Harpreet Singh (Farmer)',
        data: {
          method: 'Flood Irrigation',
          waterVolume: '15000 liters',
          duration: '8 hours'
        },
        previousHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        currentHash: '2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
        blockNumber: 1
      },
      {
        id: 'evt-13',
        batchId: 'BATCH-1730480000000-DEF456UVW',
        eventType: 'growth-monitoring',
        timestamp: '2024-11-15T10:00:00Z',
        location: 'Golden Fields, Haryana',
        actor: 'Agricultural Extension Officer',
        data: {
          plantHeight: '85 cm',
          healthStatus: 'Good',
          leafColor: 'Bright Green',
          pestObservations: 'Minor aphid presence'
        },
        previousHash: '2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
        currentHash: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
        blockNumber: 2
      },
      {
        id: 'evt-14',
        batchId: 'BATCH-1730480000000-DEF456UVW',
        eventType: 'pest-treatment',
        timestamp: '2024-11-18T08:00:00Z',
        location: 'Golden Fields, Haryana',
        actor: 'Harpreet Singh (Farmer)',
        data: {
          pestType: 'Aphids',
          treatment: 'Neem Oil Spray',
          quantity: '5 liters',
          method: 'Organic spray application'
        },
        previousHash: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
        currentHash: '4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
        blockNumber: 3
      }
    ]
  }
]
