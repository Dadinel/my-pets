import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoLookupFilter, PoLookupFilteredItemsParams, PoLookupResponseApi } from '@po-ui/ng-components';
import { Owner } from '../../../owners/shared/interfaces/owner.interface';
import { OwnersService } from '../../../owners/shared/services/owners.service';

@Injectable()
export class OwnersLookupService implements PoLookupFilter {
  private owners: Array<Owner>;

  constructor(private ownerService: OwnersService) {
    this.updateOwners();
  }

  getFilteredItems(params: PoLookupFilteredItemsParams): Observable<PoLookupResponseApi> {
    this.updateOwners();
    return this.getOwners(params.filter);
  }

  getObjectByValue(value: string | Array<any>, filterParams?: any): Observable<any> {
    this.updateOwners();

    if (value) {
      return new Observable(
          subscriber => {
            subscriber.next(this.owners.find(owner => owner.id == value))
          }
      );
    }

    return this.getOwners();
  }

  private getOwners(filter?: string): Observable<any> {
    const owners = filter ? this.owners.filter( owner => owner.name == filter ) : this.owners;
    const response: PoLookupResponseApi = {hasNext: false, items: owners};

    return new Observable<PoLookupResponseApi>(subscriber => {
      subscriber.next(response)
    });
  }

  updateOwners(): void {
    this.ownerService.get().subscribe(
      {
        next: (response: Array<Owner>) => this.owners = response
      }
    )   
  }
}