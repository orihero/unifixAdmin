import gql from 'graphql-tag';

/* #region  AUTHENTICATION */
export let LOGIN_USER = gql`
  query loginUser($username:String! $password:String!){
  loginAdmin(username:$username,password:$password)
}
`

export let VERIFY_USER = gql`query{
  verifyAdmin{
    _id
    email
    username
    password
    profile_picture
    firstname
    lastname
    phone
    address{
      region
      district
      others
      location
    }
    passport_number
    passport_expiry_date
    passport_given_address
    duc_access{
      manufacturer
      category
      shop
      courier
    }
  }
}
`
/* #endregion */


export const IMAGE_UPLOAD = gql`
mutation wrapper($file:Upload!){
  uploadImage(imageInput: {
    file: $file
  })
}`



//#region !SHOPS
export let LIST_ADMIN_SHOPS = gql`query wrapper($pageSize:Int! $next:Int!){
  listAdminShop(pageSize:$pageSize,next:$next){
    next
    hasMore
    shops{
      _id
      admin_id
      email
      username
      password
      shop_image
      business_type
      legal_name
      phone
      legal_address{
        region
        district
        others
        location
      }
      balance
      purchase_balance
      category_id
    }
  }
}`

export let UPDATE_SHOP = gql`
mutation wrapper($input:ShopInput!){
  updateShop(shopInput:$input){
    username
    _id
    admin_id
    email
    password
    shop_image
    business_type
    legal_name
    phone
    category_id
    balance
    purchase_balance
    legal_address{
      region
      location
      others
      district
    }
  }
}
`

export let ADD_SHOP = gql`
mutation wrapper($input:ShopInput!){
  createShop(shopInput:$input){
    username
    _id
    admin_id
    email
    password
    shop_image
    business_type
    legal_name
    phone
    category_id
    balance
    purchase_balance
    legal_address{
      region
      location
      others
      district
    }
  }
}
`


export const REMOVE_SHOP = gql`
mutation wrapper($id:String!){
  deleteShop(_id:$id){
    _id
  }
}
`

export const LIST_CATEGORIES_NESTED = gql`
query{
	getAllCategoriesNested
}`

//#endregion



//#region MANUFACTURERS
export let LIST_ADMIN_MANUFACTURER = gql`query wrapper($pageSize:Int! $next:Int!){
  listMyManufacturer(pageSize:$pageSize,next:$next){
    next
    hasMore
    manufacturers{
      _id
      admin_id
      legal_name
      brand_name
      brand_picture
      bussiness_type
      category_id
      email
      phone
      legal_address{
        region
        district
        others
        location
      }
      stir
      ifut
      main_bank
      bank_account
      mfo
    }
  }
}`

export let UPDATE_MANUFACTURER = gql`
mutation wrapper($input:ManufacturerInput!){
  updateManufacturer(manufacturer:$input){
    _id
    admin_id
    legal_name
    brand_name
    brand_picture
    bussiness_type
    category_id
    email
    phone
    legal_address{
      region
      district
      others
      location
    }
    stir
    ifut
    main_bank
    bank_account
    mfo
  }
}
`

export let ADD_MANUFACTURER = gql`
mutation wrapper($input:ManufacturerInput!){
  createManufacturer(manufacturer:$input){
     _id
    admin_id
    legal_name
    brand_name
    brand_picture
    bussiness_type
    category_id
    email
    phone
    legal_address{
      region
      district
      others
      location
    }
    stir
    ifut
    main_bank
    bank_account
    mfo
  }
}
`


export const REMOVE_MANUFACTURER = gql`
mutation wrapper($id:String!){
  deleteManufacturer(_id:$id){
    _id
  }
}
`

//#endregion



/* #region  COURIERS */


export const LIST_ADMIN_COURIERS = gql`
query wrapper($pageSize:Int! $next:Int!){
listAdminCourier(pageSize:$pageSize,next:$next){
    next
    hasMore
    couriers{
      _id
      admin_id
      email
      username
      password
      profile_picture
      courier_type
      firstname
      lastname
      phone
      address{
        region
        district
        others
        location
      }
      passport_given_address
      passport_expiry_date
      passport_number
    }
  }
}`

export const REMOVE_COURIER = gql`
mutation wrapper($id:String!){
  deleteCourier(_id:$id){
    _id
  }
}
`


export let UPDATE_COURIER = gql`
mutation wrapper($input:CourierInput!){
  updateCourier(courierInput:$input){
    _id
    admin_id
    email
    username
    password
    profile_picture
    courier_type
    firstname
    lastname
    phone
    address{
      region
      district
      others
      location
    }
    passport_given_address
    passport_expiry_date
    passport_number
  }
}
`

export let ADD_COURIER = gql`
mutation wrapper($input:CourierInput!){
  createCourier(courierInput:$input){
    _id
    admin_id
    email
    username
    password
    profile_picture
    courier_type
    firstname
    lastname
    phone
    address{
      region
      district
      others
      location
    }
    passport_given_address
    passport_expiry_date
    passport_number
  }
}
`
/* #endregion */


//#region MANUFACTURERS
export let LIST_CATEGORIES = gql`query{
  getCategoryList{
    _id
    name
    parent
    path
  }
}`

//#endregion


/* #region  Order */

export const LIST_ORDER_STATUSES = gql`query{
  listOrderStatus(pageSize:100,next:1){
    next
    hasMore
    orderStatuses{
      _id
      status
      title
      count
    }
  }
}`


export const LIST_ORDER_BY_STATUS = gql`
query wrapper($status:String! $pageSize:Int! $next:Int!){
  getOrderBatchByStatus(status:$status,pageSize:$pageSize,next:$next){
    next
    hasMore
    orders{
      _id
      shop_id
      package_number
      courier_id
      product{
        product_id
        name
        stock{
          _id
          stock_id
          title
          value
          price
          discount
          image
          qty
          count
          sold
        }
        count_measurement
      }
      totalQty
      totalPrice
      totalDiscount
      status
      history{
        status
        updated_at
        updated_by
        updater_id
      }
      created_at
      updated_at
      delivered_at
      finished_at
    }
  }
}
`

export const GROUP_ORDER = gql`
query wrapper($pageSize:Int! $next:Int! $groupBy:String! $matchBy:String){
  getGroupedOrderBatch(pageSize:$pageSize,next:$next,groupBy:$groupBy,matchBy:$matchBy){
    next
    hasMore
    groupedOrders{
      _id
			orders{
        _id
        shop_id
        package_number
        courier_id
        product{
          product_id
          name
          stock{
            _id
            stock_id
            title
            value
            price
            discount
            image
            qty
            count
            sold
          }
          count_measurement
        }
        totalQty
        totalPrice
        totalPrice
        totalDiscount
        status
        history{
          status
          updated_at
          updated_by
          updater_id
        }
        created_at
        updated_at
        delivered_at
        finished_at
      }
    }
  }
}`

/* #endregion */


/* #region  PRODUCT */
export let ADD_PRODUCT = gql`
mutation wrapper($input:ProductInput!){
  createProduct(productInput:$input){_id}}`


export let UPDATE_PRODUCT = gql`
mutation wrapper($input:ProductInput!){
  updateProduct(productInput:$input){_id}}`

export let REMOVE_PRODUCT = gql`
mutation wrapper($input:String!){
  removeProduct(id:$input){_id}}`
/* #endregion */