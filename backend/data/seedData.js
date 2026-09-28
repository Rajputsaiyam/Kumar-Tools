const STORE_INFO = {
  name: "Kumar Tools & Refrigeration",
  phone: "9210797245",
  phoneDisplay: "+91 92107 97245",
  email: "saiyamrajput71@gmail.com",
  address: "Ravi Nagar Extension, Khayala, Vishnu Garden, New Delhi - 110018",
  city: "Delhi, India",
  hours: "Monday – Saturday, 10:00 AM – 8:00 PM",
};

const CATEGORIES = {
  hardware: { name: "Hardware & Power Tools", path: "/hardware-tools", blurb: "Professional hand and power tools for mechanics and HVAC technicians." },
  ac: { name: "AC Spare Parts", path: "/ac-spare-parts", blurb: "Reliable components for AC repair and maintenance." },
  fridge: { name: "Refrigerator Parts", path: "/refrigerator-parts", blurb: "Essential refrigerator components and spares." },
};

const p = (slug, name, category, brand, price, stock, short, specs, image) => ({
  id: slug,
  slug,
  name,
  category,
  brand,
  price,
  stock,
  short,
  specs,
  image,
  active: true,
  sku: `KT-${category.toUpperCase().slice(0, 2)}-${slug.slice(0, 4).toUpperCase()}`,
  description: `${short} Suitable for professional technicians and regular maintenance work. Contact us if you need help confirming compatibility with your model.`,
});

const PRODUCTS = [
  p(
    "screwdriver-set",
    "Professional Screwdriver Set",
    "hardware",
    "Taparia",
    649,
    24,
    "12-piece chrome vanadium screwdriver set with magnetic tips and insulated ergonomic grip.",
    { Pieces: "12", Material: "Chrome Vanadium", Handle: "Insulated 1000V" },
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "combination-plier",
    "Combination Plier",
    "hardware",
    "Taparia",
    289,
    40,
    "8-inch insulated combination plier for heavy-duty electrical wire gripping and cutting.",
    { Size: "8 inch", Insulation: "1000V", Material: "Forged Steel" },
    "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "adjustable-wrench",
    "Adjustable Wrench",
    "hardware",
    "Stanley",
    459,
    3,
    "10-inch adjustable wrench with wide jaw capacity and laser-etched scale.",
    { Size: "10 inch", Jaw: "30 mm", Finish: "Chrome Nickel" },
    "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "drill-bit-set",
    "Drill Bit Set",
    "hardware",
    "Bosch",
    899,
    18,
    "13-piece HSS titanium coated drill bit set for metal, wood and plastic.",
    { Pieces: "13", Type: "HSS Titanium", Shank: "Straight" },
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "bosch-impact-drill",
    "Bosch Professional Impact Power Drill (550W)",
    "hardware",
    "Bosch",
    2399,
    14,
    "Heavy-duty 550W reversible variable speed impact power drill for masonry, concrete, wood and metal drilling.",
    { Power: "550 Watts", Chuck: "13 mm Keyed", Speed: "0-2800 RPM", Voltage: "230V AC" },
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "cordless-screwdriver-kit",
    "Cordless Power Drill & Screwdriver Driver Kit",
    "hardware",
    "Bosch",
    1899,
    10,
    "Rechargeable 12V Li-ion cordless power drill driver with 24 screw bit accessories and variable torque settings.",
    { Battery: "12V 1.5Ah Li-Ion", Torque: "30 Nm", Chuck: "10 mm Keyless", Warranty: "6 Months" },
    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "ac-capacitor",
    "AC Capacitor",
    "ac",
    "Epcos",
    349,
    55,
    "Dual run capacitor for 1.0 - 1.5 ton split and window AC compressors.",
    { Rating: "35+5 µF", Voltage: "440V AC", Frequency: "50/60 Hz" },
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "ac-contactor",
    "AC Contactor",
    "ac",
    "Schneider",
    749,
    18,
    "Heavy-duty single-pole contactor for outdoor AC condenser units.",
    { Coil: "24V AC", Current: "30A", Poles: "1-Pole" },
    "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "ac-fan-motor",
    "AC Fan Motor",
    "ac",
    "Generic",
    1899,
    6,
    "Outdoor condenser fan motor with 100% pure copper winding for 1–1.5 ton split ACs.",
    { Power: "60W", Speed: "850 RPM", Rotation: "CW/CCW" },
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "ac-temperature-sensor",
    "AC Temperature Sensor",
    "ac",
    "Generic",
    199,
    2,
    "Thermistor sensor probe for indoor copper coil and room temperature sensing.",
    { Type: "NTC 10K", Length: "50 cm", Material: "Copper Bulb" },
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "refrigerator-relay",
    "Refrigerator Relay",
    "fridge",
    "Embraco",
    249,
    30,
    "PTC starting relay with built-in overload protection for refrigerator compressors.",
    { Type: "PTC", Pins: "3-Pin", Resistance: "15-22 Ohm" },
    "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "refrigerator-thermostat",
    "Refrigerator Thermostat",
    "fridge",
    "Ranco",
    399,
    12,
    "Mechanical temperature controller thermostat for single and double door fridges.",
    { Range: "-25°C to 0°C", Capillary: "750 mm" },
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "refrigerator-sensor",
    "Refrigerator Sensor",
    "fridge",
    "Generic",
    179,
    4,
    "Defrost temperature sensor probe for frost-free double door refrigerators.",
    { Type: "NTC", Length: "40 cm", MoistureProof: "Yes" },
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  ),
  p(
    "refrigerator-fan-motor",
    "Refrigerator Fan Motor",
    "fridge",
    "Generic",
    699,
    9,
    "Evaporator circulation fan motor for frost-free cooling compartments.",
    { Voltage: "220V", Power: "10W", Speed: "1300 RPM" },
    "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80"
  ),
];

const INITIAL_ORDERS = [
  {
    id: "KT-ORD-1001",
    customer: "Saiyam Rajput",
    phone: "9210797245",
    items: "AC Capacitor × 2",
    total: 698,
    date: "2026-09-25",
    status: "Confirmed",
  },
  {
    id: "KT-ORD-1002",
    customer: "Ravi Shankar (Technician)",
    phone: "9811223344",
    items: "Professional Screwdriver Set × 1, Combination Plier × 2",
    total: 1227,
    date: "2026-09-24",
    status: "Processing",
  },
  {
    id: "KT-ORD-1003",
    customer: "Amit Verma",
    phone: "9876543210",
    items: "AC Contactor × 1, AC Fan Motor × 1",
    total: 2648,
    date: "2026-09-23",
    status: "Ready",
  },
];

const INITIAL_SERVICES = [
  {
    id: "KT-SRV-2001",
    name: "Vikram Malhotra",
    phone: "9899112233",
    email: "vikram@example.com",
    device: "AC",
    service: "AC Servicing",
    address: "Ravi Nagar Extension, Khayala, Delhi - 110018",
    problem: "Split AC cooling is weak and water is dripping from indoor blower unit.",
    date: "2026-09-26",
    timeSlot: "Morning (9–12)",
    status: "Scheduled",
  },
  {
    id: "KT-SRV-2002",
    name: "Sonia Gupta",
    phone: "9871122334",
    device: "Refrigerator",
    service: "Cooling Problems",
    address: "Vishnu Garden, Delhi - 110018",
    problem: "Freezer cooling is OK but lower compartment is warm and ice is forming on back coil.",
    date: "2026-09-26",
    timeSlot: "Afternoon (12–4)",
    status: "New",
  },
];

module.exports = {
  STORE_INFO,
  CATEGORIES,
  PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_SERVICES,
};
