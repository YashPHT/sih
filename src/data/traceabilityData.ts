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
        currentHash: '1f82e9b3ed93d8b9a53e06176f831db0663ea47b6fecca4673e47232e7f5b9f9',
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
        previousHash: '1f82e9b3ed93d8b9a53e06176f831db0663ea47b6fecca4673e47232e7f5b9f9',
        currentHash: 'eead998d6cf63b5cec8fd26a471390f0a571795d82002926e416bd79949c462c',
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
        previousHash: 'eead998d6cf63b5cec8fd26a471390f0a571795d82002926e416bd79949c462c',
        currentHash: 'ca99f63722cbc4ae51e79c312ffd4549c66e787dbbbf711be00db8a2f4e1c53d',
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
        previousHash: 'ca99f63722cbc4ae51e79c312ffd4549c66e787dbbbf711be00db8a2f4e1c53d',
        currentHash: '2a7606a7729fb698fc76b58daf2827eb903252c970eec8847bd2701d3d19d31e',
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
        previousHash: '2a7606a7729fb698fc76b58daf2827eb903252c970eec8847bd2701d3d19d31e',
        currentHash: '9927ca56384ee0af536230b7009fa74d0d5778c8fa8f82033f51035e02252678',
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
        previousHash: '9927ca56384ee0af536230b7009fa74d0d5778c8fa8f82033f51035e02252678',
        currentHash: 'de44bc6adb9622e650a329ee28f343777a563adfb08605500eaf1b556e747495',
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
        previousHash: 'de44bc6adb9622e650a329ee28f343777a563adfb08605500eaf1b556e747495',
        currentHash: 'dd6a73f0c7c0eec15eded6519feaec64dd6c0a548403faa76c0cae1a3453d3c4',
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
        previousHash: 'dd6a73f0c7c0eec15eded6519feaec64dd6c0a548403faa76c0cae1a3453d3c4',
        currentHash: '1741cce3d0749f4164c215df43c1d70d5cf05dbe00206bf12cff50dfb14dc3f9',
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
        previousHash: '1741cce3d0749f4164c215df43c1d70d5cf05dbe00206bf12cff50dfb14dc3f9',
        currentHash: 'b4a567edf575b95ae5d672ebd5e65da328d3fdf9eb5c5771c89b0844f25b7b47',
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
        previousHash: 'b4a567edf575b95ae5d672ebd5e65da328d3fdf9eb5c5771c89b0844f25b7b47',
        currentHash: '1cfa7a40766a640a0f16effd00dc0b132b9cd4c8b452d366d4be54bdc2c8f74d',
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
        currentHash: '3cca3c4167be2637c310a1b2530a2ed184f03853fc592b396381f74904dc3dbe',
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
        previousHash: '3cca3c4167be2637c310a1b2530a2ed184f03853fc592b396381f74904dc3dbe',
        currentHash: '861eb3c3394c479e9c687b92f0ee5543609008b8931db5775b592b2c0dbcf934',
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
        previousHash: '861eb3c3394c479e9c687b92f0ee5543609008b8931db5775b592b2c0dbcf934',
        currentHash: 'f70cdb5d78447778ea3472f9e55d2f4eb3e62f9bb728b66f32088202decaa747',
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
        previousHash: 'f70cdb5d78447778ea3472f9e55d2f4eb3e62f9bb728b66f32088202decaa747',
        currentHash: '97c8c2330258e6ffca9875e386479c22840729e016cbc376ee9bfdd6fef6891b',
        blockNumber: 3
      }
    ]
  }
]
