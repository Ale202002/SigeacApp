import { ComponentState } from "@core/enums/components-enums/component-state.enum";
import { ComponentType } from "@core/enums/components-enums/component-type.enum";
import { Device } from "./device.interface";

export interface Components {
    ID_Component: number;
    Tipo : ComponentType;
    Nombre: string;
    Estado:ComponentState;
    EquipoID: number;
    Equipo?:Device;
}

export interface ComponentCreate{
    Nombre: string;
    Tipo : ComponentType;
    Estado:ComponentState;
}

export interface ComponentUpdate{
    Nombre: string;
    Tipo : ComponentType;
    Estado:ComponentState;
}