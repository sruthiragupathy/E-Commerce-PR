import faker from "faker";

faker.seed(123);

const femaleImageArray = [
  "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11201536/2020/2/11/6b5b3442-b0ec-4365-a3ab-f6567620db021581416079076-Anouk-Women-Kurtas-3881581416077880-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2329502/2017/12/12/11513075473636-na-1991513075473475-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/11/27/c27e8849-4ef9-4b3c-a7d5-fbda37fcac501574854149745-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11066882/2020/1/13/7c708a55-fcee-45a4-901d-da0dffa5cb491578911582522-Popnetic-Women-Green--Golden-Printed-Straight-Kurta-71015789-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2477343/2018/2/22/11519301743689-Libas-Women-Green-Woven-Design-Pathani-Kurta-4531519301743438-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/10/20/0d2fd0e4-d737-471f-9a05-a7b21fec6f021603155059754-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11056116/2019/12/5/07ecf9b0-9dc4-42d1-a05d-fa2c17b5ddbf1575541755774-AHIKA-Women-Navy-Blue--Beige-Printed-Straight-Kurta-52515755-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/12924516/2020/11/27/534b6c7d-8663-4a25-a973-8240b45541921606462011449-AHIKA-Women-Kurtas-401606462009205-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11066882/2020/1/13/7c708a55-fcee-45a4-901d-da0dffa5cb491578911582522-Popnetic-Women-Green--Golden-Printed-Straight-Kurta-71015789-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/13200334/2021/1/29/bb36e635-c0b7-40c4-bd3b-9471a59a5a6a1611900930935-Moda-Rapido-Women-Pink--Green-Printed-A-Line-Kurta-765161190-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/12246214/2021/1/21/fb8fc504-76cd-4d6a-a16e-e20bdc7bebe41611204555225-Ahalyaa-Women-Maroon--Gold-Printed-Kurti-with-Sharara--Dupat-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11636314/2020/3/9/c95c3439-c1d1-4ff9-bbfc-fe48d5c8c1d91583728101213-Shae-by-SASSAFRAS-Women-Blue--White-Printed-A-Line-Kurta-480-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/2/6/52c33c7b-e3ee-4f92-bacd-ad56382610e11549445641627-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/7719123/2018/11/20/f5dfc7ea-33a1-4753-aa35-5db483bb1d911542699266441-Libas-Women-Kurta-Sets-101542699266110-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/13451944/2021/2/3/794b2319-cb53-4cce-a04f-068d9b955fcb1612334113817-mokshi-Women-Charcoal--Pink-Printed-Kurta-with-Palazzos--Dup-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/13451944/2021/2/3/794b2319-cb53-4cce-a04f-068d9b955fcb1612334113817-mokshi-Women-Charcoal--Pink-Printed-Kurta-with-Palazzos--Dup-1.jpg"
];

export const brandNameArray = [
  "Anouk",
  "Biba",
  "Indo Era",
  "Soch",
  "W",
  "Aurelia",
  "Allen Solly Woman",
  "AKS Couture",
  "Melange"
];

const descriptionArray = [
  "Women Navy Blue Printed A-Line Kurta",
  "Women Navy Blue & Silver-Toned Printed Anarkali Kurta",
  "Women Pink & Silver Printed Anarkali Kurta with Palazzos",
  "Women Blue & Beige Printed Straight Kurta",
  "Women Green & White Printed Kurta with Skirt",
  "Hunter Green Patterned Viscose Pathani Kurta With Shirt Collar",
  "Woman Kurta with Palazzos",
  "Mandarin Collar Anarkali",
  "Printed Kurta with Palazzos",
  "Solid Straight Kurta"
];

const discountArray = [10, 20, 30, 0, 50];

const ratingArray = [2, 3, 4, 5];

const countArray = [2,5,6,10,20];

const sellerArray = ["house of masaba"]

export const femaleProducts = [...Array(25)].map((item) => ({
  id: faker.datatype.uuid(),
  image: faker.random.arrayElement(femaleImageArray),
  brandName: faker.random.arrayElement(brandNameArray),
  description: faker.random.arrayElement(descriptionArray),
  price: faker.commerce.price(),
  isnew: faker.datatype.boolean(),
  sale: faker.datatype.boolean(),
  outOfStock: faker.datatype.boolean(),
  discountByPercentage: faker.random.arrayElement(discountArray),
  rating: faker.random.arrayElement(ratingArray),
  count:faker.random.arrayElement(countArray),
  isWishlisted:false,
  isInCart:false,
  seller:faker.random.arrayElement(sellerArray),
  type: "female"
}));