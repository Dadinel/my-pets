import { Owner } from "src/app/features/owners/shared/interfaces/owner.interface";

export interface Pet {
    id: string;
    name: string;
    breed: string;
    color: string;
    type: string;
    ownerId: number;
    owner?: Owner
}