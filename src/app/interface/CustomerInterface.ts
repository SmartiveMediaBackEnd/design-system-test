import { AddressCustomerInterface } from "./AddresseCustomerinterface"


export interface CustomerInterface {
    id: string
    name?: string
    first_name?: string
    last_name?: string
    phone?: string
    city?: string
    Orders?: number
    email?: string
    "E-Subscription"?: boolean
    gender?: string
    customer_group_id: string
    addresses: AddressCustomerInterface[]
    orders:AddressCustomerInterface[]
}

export const initialCustomerData = () => {
    return {
        id: "",
        name: "",
        first_name: "",
        last_name: "",
        phone: "",
        city: "",
        Orders: 0,
        email: "",
        "E-Subscription": false,
        gender: "",
        customer_group_id: "",
        addresses: [],
        orders:[]
    }
}