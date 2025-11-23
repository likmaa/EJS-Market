import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Créer les taux TVA par pays
  const taxRates = [
    { countryCode: 'FR', rate: 0.20, reducedRate: 0.055 },
    { countryCode: 'ES', rate: 0.21, reducedRate: 0.10 },
    { countryCode: 'DE', rate: 0.19, reducedRate: 0.07 },
    { countryCode: 'IT', rate: 0.22, reducedRate: 0.10 },
    { countryCode: 'BE', rate: 0.21, reducedRate: 0.12 },
    { countryCode: 'NL', rate: 0.21, reducedRate: 0.09 },
    { countryCode: 'PT', rate: 0.23, reducedRate: 0.13 },
  ];

  for (const taxRate of taxRates) {
    await prisma.taxRate.upsert({
      where: { countryCode: taxRate.countryCode },
      update: {},
      create: taxRate,
    });
    console.log(`✅ Tax rate for ${taxRate.countryCode}: ${taxRate.rate * 100}%`);
  }

  // Créer les zones de livraison
  const shippingZones = [
    {
      name: 'Zone 1 - Europe de l\'Ouest',
      countries: ['FR', 'BE', 'NL', 'DE'],
      basePrice: 500, // 5.00€ en centimes
      pricePerKg: 50, // 0.50€ par kg supplémentaire
    },
    {
      name: 'Zone 2 - Europe du Sud',
      countries: ['ES', 'IT', 'PT'],
      basePrice: 1000, // 10.00€
      pricePerKg: 100, // 1.00€ par kg
    },
  ];

  for (const zone of shippingZones) {
    const existing = await prisma.shippingZone.findFirst({
      where: { name: zone.name },
    });
    
    if (!existing) {
      await prisma.shippingZone.create({
        data: zone,
      });
      console.log(`✅ Shipping zone: ${zone.name}`);
    }
  }

  // Créer les méthodes de livraison
  const shippingMethods = [
    {
      name: 'Standard',
      carrier: 'DHL',
      maxWeight: 30,
      maxDimension: 100,
    },
    {
      name: 'Express',
      carrier: 'UPS',
      maxWeight: 30,
      maxDimension: 100,
    },
    {
      name: 'Spécial',
      carrier: 'Transporteur Spécial',
      maxWeight: null,
      maxDimension: null,
    },
  ];

  for (const method of shippingMethods) {
    await prisma.shippingMethod.create({
      data: method,
    });
    console.log(`✅ Shipping method: ${method.name}`);
  }

  console.log('✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

