import {
  ActiveItemHandler,
  AddItemConversionHandler,
  AddItemTagMapHandler,
  CreateItemTagHandler,
  DeleteItemTagHandler,
  InactiveItemHandler,
  RegisterItemHandler,
  UpdateItemHandler,
  UpdateItemTagHandler,
  UpdateItemWeightVolumeHandler,
} from './handlers';

export const Commands = {
  handlers: [
    RegisterItemHandler,
    CreateItemTagHandler,
    UpdateItemTagHandler,
    DeleteItemTagHandler,
    AddItemTagMapHandler,
    ActiveItemHandler,
    InactiveItemHandler,
    AddItemConversionHandler,
    UpdateItemHandler,
    UpdateItemWeightVolumeHandler
  ]
}
