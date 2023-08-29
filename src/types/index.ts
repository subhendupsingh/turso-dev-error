import { InferModel, SQL } from "drizzle-orm";
import { StatusCode } from "hono/utils/http-status";
import { businessCategories, currencies, media, organizations, paymentMethods, products, users, subscriptions, categories, orders, states, productsOnOrder, productVariantItems, countries, pages, roles, userProfile, key, permissions, productUnit, sections, sectionsOnOrganization, taxes, heroSections, bankDetails, paymentMethodsOnOrganization, shippingProviders, shipping, productVariants } from "../db/schema";
import { createInsertSchema } from 'drizzle-zod';
import z from "zod";

export type ErrorResult  =  {error: { message: string, code: StatusCode }, status?: StatusCode | undefined};
export type RoleName = "ADMIN" | "SHOPADMIN" | "CUSTOMER" | "ORDERMANAGER" | "CATALOGMANAGER";

export type Organizations = InferModel<typeof organizations>;
export type InsertOrganizations = InferModel<typeof organizations, "insert">;
export type UpdateOrganization = z.infer<typeof updateOrganizationSchema>;
export type Media = InferModel<typeof media>;
export type Currency = InferModel<typeof currencies>;
export type PaymentMethod = InferModel<typeof paymentMethods>;
export type InsertPaymentMethod = InferModel<typeof paymentMethods, "insert">;
export type PaymentMethodsOnOrganizationferModel = InferModel<typeof paymentMethodsOnOrganization>;
export type Order = InferModel<typeof orders>;
export type InsertOrder = InferModel<typeof orders, "insert">;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
export type Product = InferModel<typeof products>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export type ProductUnit = InferModel<typeof productUnit>;
export type InsertProduct = InferModel<typeof products, "insert">;
export type Category = InferModel<typeof categories>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type CreateCategory = InferModel<typeof categories, "insert">;
export type User = InferModel<typeof users>;
export type UserProfile = InferModel<typeof userProfile>;
export type UserWithProfileAndRole = { user: User, profile: UserProfile | null, role: Role[], permissions: Permission[] | null };
export type Role = InferModel<typeof roles>;
export type Permission = InferModel<typeof permissions>;
export type Customer = Partial<UserProfile & {email: string}>;
export type BusinessCategory = InferModel<typeof businessCategories>;
export type Subscriptions = InferModel<typeof subscriptions>;
export type UpdateSubscriptions = z.infer<typeof updateSubscriptionSchema>
export type Orders = InferModel<typeof orders>;
export type ProductVariantItems = InferModel<typeof productVariantItems>;
export type ProductsOnOrder = InferModel<typeof productsOnOrder>;
export type Country = InferModel<typeof countries>;
export type State = InferModel<typeof states>;
export type Pages = InferModel<typeof pages>;
export type Key = InferModel<typeof key>;
export type Section = InferModel<typeof sections>;
export type HeroSection = InferModel<typeof heroSections>;
export type InsertHeroSection = InferModel<typeof heroSections, "insert">;
export type SectionOnOrganization = InferModel<typeof sectionsOnOrganization>;
export type InsertSectionOnOrganization = InferModel<typeof sectionsOnOrganization, "insert">;
export type UpdateSectionOnOrganization = z.infer<typeof updateSectionOnOrganizationSchema>;
export type InsertKey = InferModel<typeof key, "insert">;
export type InsertTax = InferModel<typeof taxes, "insert">;
export type UpdateTax = z.infer<typeof updateTaxSchema>;
export type Tax = InferModel<typeof taxes>;
export type BankDetails = InferModel<typeof bankDetails>;
export type InsertBankDetails = InferModel<typeof bankDetails, "insert">;
export type ShippingProvider = InferModel<typeof shippingProviders>;
export type Shipping = InferModel<typeof shipping>;
export type InsertShipping = z.infer<typeof insertShippingSchema>;
export type UpdateShipping = z.infer<typeof updateShippingSchema>;
export type ProductVariant = InferModel<typeof productVariants>;
export type ProductVariantItem = InferModel<typeof productVariantItems>;

export type TokenType = "PASSWORD" | "PASSWORD_RESET" | "AUTH_TOKEN" | "REFRESH_TOKEN";
export type OrderStatus = SQL<unknown> | "CART" | "PROCESSING" | "COMPLETE" | "CANCELLED" | null | undefined;
export type ProductImageShape = "SQUARE" | "PORTRAIT" | null;
export type SessionUser = {id: string, roles: string[], permissions: string[] | null, organizationId: string | null, email: string}

export const insertSubscriptionSchema = createInsertSchema(subscriptions);
export const updateSubscriptionSchema = insertSubscriptionSchema.partial();
export const insertCategorySchema = createInsertSchema(categories);
export const updateCategorySchema = insertCategorySchema.partial();
export const insertProductSchema = createInsertSchema(products);
export const updateProductSchema = insertProductSchema.partial().required({id: true});
export const insertOrganizationSchema = createInsertSchema(organizations);
export const updateOrganizationSchema = insertOrganizationSchema.partial().required({id: true});
export const insertSectionOnOrganizationSchema = createInsertSchema(sectionsOnOrganization);
export const updateSectionOnOrganizationSchema = insertSectionOnOrganizationSchema.partial().required({id: true});
export const insertTaxSchema = createInsertSchema(taxes);
export const updateTaxSchema = createInsertSchema(taxes).partial().required({id: true});
export const insertShippingSchema = createInsertSchema(shipping);
export const updateShippingSchema = createInsertSchema(shipping).partial().required({organizationId: true, shippingProviderId: true});
export const insertOrderSchema = createInsertSchema(orders);
export const updateOrderSchema = createInsertSchema(orders).partial().required({id: true});

export type SubscriptionType = "FREE" | "LAUNCH" | "SCALE" | "THRIVE" | null ;

export type OrganizationSettings = {
    storeName?: string | null,
    storeLogo?: boolean | null,
    orgBrandColor?: string | null,
    logo?: Media | null,
    productCount?: number,
    categoryCount?: number,
    customerSupport?: string | null,
    socialMediaLinks?: any | null,
    isInstaConnected?: boolean,
    priceDelimiter?: string | null,
    categoryDelimiter?: string | null,
    titleDelimiter?: string | null,
    descriptionDelimiter?: string | null,
    instaUserType?: string,
    onBoardingSteps?: any,
    currency?: string | null,
    orgLink?: string | null,
    customDomain?: string | null,
    subscriptionType?: SubscriptionType,
    subscriptionId?: string,
    theme?: string | null,
    productImageShape?: "SQUARE" | "PORTRAIT" | null,
    dynamicSettings?: any
}

export interface Geonames {
    geonames: any[];
}

export interface GeoCountry {
    continent:        string;
    capital:          string;
    languages:        string;
    geonameId:        number;
    south:            number;
    isoAlpha3:        string;
    north:            number;
    fipsCode:         string;
    population:       string;
    east:             number;
    isoNumeric:       string;
    areaInSqKm:       string;
    countryCode:      string;
    west:             number;
    countryName:      string;
    postalCodeFormat: string;
    continentName:    string;
    currencyCode:     string;
}

export interface GeoState {
    lng:         string;
    geonameId:   number;
    countryCode: string;
    name:        string;
    toponymName: string;
    lat:         string;
    fcl:         string;
    fcode:       string;
}

export interface ConfiguredDomains {
    defaultDomain: string | null,
    customDomain?: string | null,
    isCustomDomainValidConfig?: boolean
}

export interface AdminHistoryOrder {
    id: string,
    total: number | null,
    products: string,
    orderedAt: Date | null,
    image: string | null,
    status: string | null,
    customer?: Partial<Customer>
}

export interface HistoryOrderDetail {
    orderId: string,
    orderedAt: string,
    total: string | undefined,
    subTotal: string | undefined,
    status?: string,
    tax: string | undefined,
    products: { title: string, image: string | null, quantity: number, variant?: string, price: string, category: string | null, length?: number, width?: number, height?: number, weight?: number },
    customer: Customer,
    seller: { gst: string | null, name: string, address: string | null, city: string | null, country: string | null, state: string | null, postalCode: string | null, phone: string | null},
    paymentMethod?: string | undefined,
    shippingOrderId?: number | null
    shipmentId?: number | null
    awbCode?: string | null
    pickupScheduleDate?: string | null
    courierName?: string | null
    chargedWeight?: string | null
    labelUrl?: string | null
    manifestUrl?: string | null
    routingCode?: string | null
}

export interface TaxSettings {
    isRatesTaxInclusive: boolean,
    taxes: Tax[] | null,
    gstNumber: string | null
}

export const storeInfo = z.object({
    logo: z.string(),
    storeName: z.string(),
    storeLink: z.string(),
    storeTagLine: z.string()
})

export type StoreInfo = z.infer<typeof storeInfo>;

export const storeSocialMedia = z.object({
    twitter: z.string().nullable(),
    instagram: z.string().nullable(),
    youtube: z.string().nullable(),
    facebook: z.string().nullable()
})

export type StoreSocialMedia = z.infer<typeof storeSocialMedia>;

export const storeAddress = z.object({
    address: z.string(),
    country: createInsertSchema(countries),
    state: createInsertSchema(states),
    city: z.string(),
    postalCode: z.string(),
})

export type StoreAddress = z.infer<typeof storeAddress>;

export const storeSupport = z.object({
	email: z.string().nullable(),
	phone: z.string().nullable()
})

export type StoreSupport = z.infer<typeof storeSupport>;

export interface PaymentSettings {
    bankDetails?: BankDetails[] | null,
    paymentMethods?: PaymentMethod[] | null,
    isPrepaidPending : boolean
}

export const shippingAddressSchema = z.object({
    company_id: z.number(),
    pickup_location: z.string(),
    address: z.string(),
    address_2: z.string(),
    address_type: z.null(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    gstin: z.null(),
    pin_code: z.string(),
    phone: z.string(),
    email: z.string(),
    name: z.string(),
    alternate_phone: z.null(),
    lat: z.null(),
    long: z.null(),
    status: z.number(),
    phone_verified: z.number(),
    rto_address_id: z.number(),
    extra_info: z.string(),
    updated_at: z.date(),
    created_at: z.date(),
    id: z.number(),
    pickup_code: z.string()
})

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

export interface ShippingPickupLocationResponse {
    data: {
        shipping_address: ShippingAddress[],
        company_name: string
    }
}

export interface ShippingPickupLocation {
    pickup_location: string;
    name:            string;
    email:           string;
    phone:           string;
    address:         string;
    address_2?:      string;
    city:            string;
    state:           string;
    country:         string;
    pin_code:        string;
}

export interface CreatePickupLocationResponse {
    success:      boolean;
    address:      ShippingAddress;
    pickup_id:    number;
    company_name: string;
    full_name:    string;
}

export interface ShippingServiceabilityOptions {
    pickup_postcode: number
    delivery_postcode: number
    order_id?: number | undefined
    cod?: number | undefined
    weight: string
    length: number
    breadth: number
    height: number
    declared_value?: number | undefined
    is_return?: number | undefined
    only_local?: number | undefined
}

export interface ProductTile {
    id: string,
    title: string,
    images?: Media[],
    regularprice: number,
    salePrice?: number,
    slug: string,
    status: STOCK_STATUS,
    priority: number,
    category?: Category | null
}

export const enum STOCK_STATUS {
    IN_STOCK,
    OUT_OF_STOCK
}

export interface ISection {
	sectionKey: string;
	customName: string;
	themeColor?: string;
	configuration: any;
    priority?: number | null | undefined;
}

export interface PageContent {
    title: string,
    slug: string,
    content: string | null,
}

export type ProductVariantWithItems = ProductVariant & { items: ProductVariantItem[] };

export interface SingleProduct {
    id: string,
    title: string,
    mrp: number,
    salePrice?: number,
    description: string,
    slug: string | null,
    images?: Media[],
    category?: Category | null
    variants?: ProductVariantWithItems[],
    isInStock: boolean,
    unit?: string,
    productUnitValue?: number | null
}

export interface SearchResults {
    title: string,
    image: string | undefined | null,
    description: string | undefined,
    slug: string | null
}

export interface ProductSearchObject {
  objectID: number,
  id: number,
  title: string,
  description?: string,
  images?: (string|null)[],
  price: number,
  category?: { id: number, name: string, description?: string | null, slug: string | null },
  size?: string[],
  color?: string[],
  orgId: number,
  slug: string | null
}

type CategoriesWithSubcategories = Category & { parentCategory?: Category | null , subcategories?: Category[] | null };

export interface StoreBasicSettings {
    organizationId: string,
    storeColor?: string | null,
    storeName: string,
    logo?: Media | null,
    currency: Currency | null,
    storeSlogan?: string | null,
    categories?: CategoriesWithSubcategories[],
    heroSection?: HeroSection | null,
    supportPhone?: string | null,
    supportEmail?: string | null,
    socialMediaLinks?: SocialMediaLinks,
    orgLink?: string | null,
    gtmId?: string | null,
    dynamicSettings?: any,
    theme: string,
    imageShape: ProductImageShape,
    storeMode: boolean
}

export interface SocialMediaLinks {
    youTubeHandle: string | null,
    instagramHandle: string | null,
    twitterHandle: string | null,
    facebookHandle: string | null,
}

export interface QuickLinks {
    title: string,
    slug : string,
}