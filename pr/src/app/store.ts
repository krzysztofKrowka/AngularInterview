import { computed, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { PeriodicTableService } from './books-service';
import { EditType, PeriodicElement } from './data'



type PeriodicTableState = {
  elements: PeriodicElement[];
  isLoading: boolean;
  filter: string;
};

const initialState: PeriodicTableState = {
  elements: [],
  isLoading: false,
  filter: "",
};

export const PeriodicTableStore = signalStore(
  withState(initialState),
  withMethods((store, periodicTableService:any = inject(PeriodicTableService)) => ({
    async loadAll(){
      patchState(store,{isLoading:true})
      const result = await periodicTableService.getAll()
      patchState(store,{elements:result,isLoading:false})
    },
    async editElement(element:PeriodicElement,value:string,type:EditType){
          patchState(store,{isLoading:true})
          const result = await periodicTableService.editElement(element,value,type)
          patchState(store,(state) =>({
            elements: state.elements.map(e => e.id == result.id ? {...result}:e),
            isLoading:false
          }))
    }
  }))
);
