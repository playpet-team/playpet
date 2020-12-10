export interface PetInformation {
    id: string
    name: string
    type: 'DOG' | 'CAT'
    size: 'S' | 'M' | 'L'
    status: 'active' | 'deactive'
    weight: {
        M: number
        F: number
    }
}
