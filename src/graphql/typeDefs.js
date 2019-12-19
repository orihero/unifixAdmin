import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    getCourierPackageHistory(pageSize: Int!, next: Int!): PaginatedPackage
    getOrderBatchByStatus(
      status: String!
      pageSize: Int!
      next: Int!
    ): PaginatedOrder
    getShopActiveOrderBatch(pageSize: Int!, next: Int!): PaginatedOrder
    getShopOrderHistory(pageSize: Int!, next: Int!): PaginatedOrder
    getProductById(_id: String!): Product
    getProductBatchUnderCategory(
      category_id: String!
      pageSize: Int!
      next: Int!
    ): PaginatedProduct
    getRootCategory: Category
    verifyShop: Shop
    loginShop(username: String!, password: String!): String
    verifyCourier: Courier
    loginCourier(username: String!, password: String!): String
    listAdminShop(pageSize: Int!, next: Int!): PaginatedShop
    listAdminCourier(pageSize: Int!, next: Int!): PaginatedCourier
    listCourierType(pageSize: Int!, next: Int!): PaginatedCourierType
    listBank(pageSize: Int!, next: Int!): PaginatedBank
    listBusinessType(pageSize: Int!, next: Int!): PaginatedBusinessType
    listMeasurement(pageSize: Int!, next: Int!): PaginatedMeasurement
    listOrderStatus(pageSize: Int!, next: Int!): PaginatedOrderStatus
    listRegion(pageSize: Int!, next: Int!): PaginatedRegion
    listCounter(pageSize: Int!, next: Int!): PaginatedCounter
    listTag(pageSize: Int!, next: Int!): PaginatedTag
    listManufacturerProduct(
      manufacturer_id: String!
      pageSize: Int!
      next: Int!
    ): PaginatedProduct
    listAdminProduct(pageSize: Int!, next: Int!): PaginatedProduct
    listMyAttachedManufacturer(
      pageSize: Int!
      next: Int!
    ): PaginatedAttachedManufacturer
    listMyManufacturer(pageSize: Int!, next: Int!): PaginatedManufacturer
    verifyAdmin: Admin
    loginAdmin(username: String!, password: String!): String
    loginSuperAdmin(username: String!, password: String!): Boolean
    verifySuperAdminPasscode(passcode: String!): String
    verifySuperAdmin: SuperAdmin
    getCategoryList: [Category]
    getCategoryDescendants(_id: String!): [Category]
    getCategoryParent(_id: String!): Category
    getCategoryChilds(_id: String!): [Category]
  }
  type Mutation {
    orderDelivered(order_id: String!): Boolean
    orderShipped(package_number: Int!): Boolean
    orderLoaded(package_number: Int!): Boolean
    orderPacked(order_ids: [String]!): Boolean
    orderPicked(order_id: String!): Boolean
    orderAccepted(order_id: String!): Boolean
    addToOrder(orderInput: OrderInput): Order
    orderChangeStatus(order_id: String!, status: String!): Boolean
    deleteImage(url: String!): Boolean
    uploadImage(imageInput: ImageInput!): String
    deleteShop(_id: String!): Shop
    updateShop(shopInput: ShopInput!): Shop
    createShop(shopInput: ShopInput!): Shop
    deleteCourier(_id: String!): Courier
    updateCourier(courierInput: CourierInput!): Courier
    createCourier(courierInput: CourierInput!): Courier
    deleteCourierType(_id: String!): CourierType
    updateCourierType(courierTypeInput: CourierTypeInput!): CourierType
    createCourierType(courierTypeInput: CourierTypeInput!): CourierType
    deleteRegion(_id: String!): Region
    updateRegion(regionInput: RegionInput!): Region
    createRegion(regionInput: RegionInput!): Region
    deleteOrderStatus(_id: String!): OrderStatus
    updateOrderStatus(orderStatusInput: OrderStatusInput!): OrderStatus
    createOrderStatus(orderStatusInput: OrderStatusInput!): OrderStatus
    deleteMeasurement(_id: String!): Measurement
    updateMeasurement(measurementInput: MeasurementInput!): Measurement
    createMeasurement(measurementInput: MeasurementInput!): Measurement
    deleteBusinessType(_id: String!): BusinessType
    updateBusinessType(businessTypeInput: BusinessTypeInput!): BusinessType
    createBusinessType(businessTypeInput: BusinessTypeInput!): BusinessType
    deleteBank(_id: String!): Bank
    updateBank(bankInput: BankInput!): Bank
    createBank(bankInput: BankInput!): Bank
    deleteCounter(_id: String!): Counter
    updateCounter(counterInput: CounterInput!): Counter
    createCounter(counterInput: CounterInput!): Counter
    deleteTag(_id: String!): Tag
    updateTag(tagInput: TagInput!): Tag
    createTag(tagInput: TagInput!): Tag
    deleteProduct(_id: String!): Product
    updateProduct(productInput: ProductInput!): Product
    createProduct(productInput: ProductInput!): Product
    deleteManufacturerAdmin(_id: String!): ManufacturerAdmin
    updateManufacturerAdmin(
      manufacturerAdmin: ManufacturerAdminInput!
    ): ManufacturerAdmin
    attachManufacturerAdmin(
      manufacturerAdmin: ManufacturerAdminInput!
    ): ManufacturerAdmin
    deleteManufacturer(_id: String!): Manufacturer
    createManufacturer(manufacturer: ManufacturerInput!): Manufacturer
    updateManufacturer(manufacturer: ManufacturerInput!): Manufacturer
    updateAdmin(admin: AdminInput!): Admin
    createAdmin(admin: AdminInput!): Admin
    createSuperAdmin(
      username: String!
      password: String!
      phone: String!
    ): Boolean
    createCategory(name: String!, parent_id: String): Category
    updateCategory(_id: String!, name: String!): Category
  }

  input OrderInput {
    product_id: String
    stock: [OrderStockInput]
  }
  input OrderStockInput {
    _id: String!
    title: String
    value: String
    price: Float
    discount: Int
    image: String
    qty: Int
    count: Int
    sold: Int
  }
  type PaginatedPackage {
    next: Int!
    hasMore: Boolean!
    packages: [Package]!
  }
  type Package {
    _id: Int!
    orders: [Order]
  }
  type PaginatedOrder {
    next: Int!
    hasMore: Boolean!
    orders: [Order]!
  }
  type Order {
    _id: String
    shop_id: String
    package_number: Int
    courier_id: String

    product: OrderProduct

    totalQty: Int
    totalPrice: Float
    totalDiscount: Float

    status: String
    history: [OrderHistory]

    created_at: String
    updated_at: String
    delivered_at: String
    finished_at: String
  }
  type OrderHistory {
    status: String
    updated_at: String
    updated_by: String
    updater_id: String
  }
  type OrderProduct {
    product_id: String
    name: String
    stock: [OrderStock]
    count_measurement: String
  }
  type OrderStock {
    _id: String
    stock_id: String
    title: String
    value: String
    price: Float
    discount: Int
    image: String
    qty: Int
    count: Int
    sold: Int
  }

  input ImageInput {
    file: Upload
  }

  type PaginatedProduct {
    next: Int!
    hasMore: Boolean!
    products: [Product]!
  }
  type Size {
    x: Int
    y: Int
    z: Int
  }
  type Stock {
    _id: String
    title: String
    value: String
    price: Float
    discount: Int
    image: String
    count: Int
    sold: Int
  }
  type Product {
    _id: String
    admin_id: String
    manufacturer_id: String
    category_path: String
    name: String
    short_desc: String
    long_desc: String
    tags: [String]
    images: [String]
    thumbnail: String
    price: Float
    discount: Int
    stock: [Stock]
    count_measurement: String
    min_order: Int
    max_order: Int
    weight: Int
    size: Size
    is_hot: Boolean
    is_promoting: Boolean
    approved: Int
    disapproval_message: String
    viewed: Int
    loves: Int
    stars: Int
  }

  input CounterInput {
    _id: String
    name: String!
    title: String!
  }
  type Counter {
    _id: String
    name: String
    title: String
    count: Int
  }
  type PaginatedCounter {
    next: Int!
    hasMore: Boolean!
    counters: [Counter]!
  }

  type PaginatedTag {
    next: Int!
    hasMore: Boolean!
    tags: [Tag]!
  }
  type Tag {
    _id: String
    title: String
  }
  type PaginatedAttachedManufacturer {
    next: Int!
    hasMore: Boolean!
    attachedManufacturers: [ManufacturerAdmin]!
  }
  type ManufacturerAdmin {
    _id: String!
    admin_id: String!
    manufacturer_id: String!
    duc_access: ManufacturerAdmin_duc_access
  }
  type ManufacturerAdmin_duc_access {
    product: Int
  }
  type PaginatedManufacturer {
    next: Int!
    hasMore: Boolean!
    manufacturers: [Manufacturer]!
  }
  type Manufacturer {
    _id: String!
    admin_id: String!
    legal_name: String!
    brand_name: String!
    brand_picture: String
    bussiness_type: String
    category_id: String!
    email: String
    phone: String
    legal_address: Address
    stir: String
    ifut: String
    main_bank: String
    bank_account: String
    mfo: String
  }
  type Admin {
    _id: String!
    email: String!
    username: String!
    password: String
    profile_picture: String
    firstname: String
    lastname: String
    phone: String
    address: Address
    passport_number: String
    passport_expiry_date: String
    passport_given_address: String
    duc_access: Admin_duc_access
  }
  type Admin_duc_access {
    manufacturer: Int
    category: Int
    shop: Int
    courier: Int
  }
  type Address {
    region: String
    district: String
    others: String
    location: String
  }
  type Category {
    _id: String!
    name: String!
    parent: String!
    path: String!
  }
  type SuperAdmin {
    _id: String!
    username: String!
  }

  type Bank {
    _id: String!
    name: String!
  }
  type PaginatedBank {
    next: Int!
    hasMore: Boolean!
    banks: [Bank]!
  }
  type BusinessType {
    _id: String!
    title: String!
  }
  type PaginatedBusinessType {
    next: Int!
    hasMore: Boolean!
    businessTypes: [BusinessType]!
  }
  type Measurement {
    _id: String!
    title: String!
  }
  type PaginatedMeasurement {
    next: Int!
    hasMore: Boolean!
    measurements: [Measurement]!
  }
  type OrderStatus {
    _id: String
    status: String
    title: String
    count: Int
  }
  type PaginatedOrderStatus {
    next: Int!
    hasMore: Boolean!
    orderStatuses: [OrderStatus]!
  }
  type Region {
    _id: String!
    name: String!
    districts: [String]
  }
  type PaginatedRegion {
    next: Int!
    hasMore: Boolean!
    regions: [Region]!
  }
  type PaginatedCourierType {
    next: Int!
    hasMore: Boolean!
    courierTypes: [CourierType]!
  }
  type PaginatedCourier {
    next: Int!
    hasMore: Boolean!
    couriers: [Courier]!
  }
  type PaginatedShop {
    next: Int!
    hasMore: Boolean!
    shops: [Shop]!
  }
  type Shop {
    _id: String!
    admin_id: String
    email: String
    username: String
    password: String
    shop_image: String
    business_type: String
    legal_name: String
    phone: String
    legal_address: Address
    category_id: String
    balance: Float
    purchase_balance: Float
  }
  type CourierType {
    title: String!
  }
  type Courier {
    _id: String!
    admin_id: String
    email: String
    username: String
    password: String
    profile_picture: String
    courier_type: String
    firstname: String
    lastname: String
    phone: String
    address: Address
    passport_number: String
    passport_expiry_date: String
    passport_given_address: String
  }

  input CourierInput {
    _id: String
    email: String!
    username: String!
    password: String!
    profile_picture: String
    courier_type: String
    firstname: String
    lastname: String
    phone: String
    address: AddressInput
    passport_number: String
    passport_expiry_date: String
    passport_given_address: String
  }
  input CourierTypeInput {
    title: String!
  }
  input ShopInput {
    _id: String
    email: String!
    username: String!
    password: String!
    shop_image: String
    business_type: String
    legal_name: String!
    phone: String
    legal_address: AddressInput
    category_id: String
  }
  input BankInput {
    _id: String
    name: String!
  }
  input BusinessTypeInput {
    _id: String
    title: String!
  }
  input MeasurementInput {
    _id: String
    title: String!
  }
  input OrderStatusInput {
    _id: String
    status: String!
    title: String!
  }
  input RegionInput {
    _id: String
    name: String!
    districts: [String]
  }
  input TagInput {
    _id: String
    title: String!
  }
  input SizeInput {
    x: Int
    y: Int
    z: Int
  }
  input StockInput {
    id: String
    title: String!
    value: String!
    price: Float!
    discount: Int
    image: String
    count: Int!
  }
  input ProductInput {
    _id: String
    manufacturer_id: String!
    category_path: String!
    name: String!
    short_desc: String
    long_desc: String
    tags: [String]
    images: [String]
    thumbnail: String
    price: Float!
    discount: Int
    stock: [StockInput]!
    count_measurement: String
    min_order: Int
    max_order: Int
    weight: Int
    size: SizeInput
    is_hot: Boolean
    is_promoting: Boolean
    approved: Int
    disapproval_message: String
  }
  input ManufacturerAdminInput {
    _id: String
    admin_id: String!
    manufacturer_id: String!
    duc_access: ManufacturerAdmin_duc_accessInput
  }
  input ManufacturerAdmin_duc_accessInput {
    product: Int
  }
  input ManufacturerInput {
    _id: String
    legal_name: String!
    brand_name: String!
    brand_picture: String
    bussiness_type: String
    category_id: String!
    email: String!
    phone: String
    legal_address: AddressInput
    stir: String
    ifut: String
    main_bank: String
    bank_account: String
    mfo: String
  }
  input AdminInput {
    _id: String
    email: String!
    username: String!
    password: String!
    profile_picture: String
    firstname: String
    lastname: String
    phone: String
    address: AddressInput
    passport_number: String
    passport_expiry_date: String
    passport_given_address: String
    duc_access: Admin_duc_accessInput
  }
  input Admin_duc_accessInput {
    manufacturer: Int
    category: Int
    shop: Int
    courier: Int
  }
  input AddressInput {
    region: String
    district: String
    others: String
    location: String
  }
`;

export default typeDefs;
