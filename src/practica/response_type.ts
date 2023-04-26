/**
 * Type que define la respuesta de la API
 */
export type ResponseType = {
    type: 'add' | 'list' | 'update' | 'delete' | 'read';
    success: boolean;
    funkoData: any,
}