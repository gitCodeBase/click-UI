import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
    public auditorium: string = '5d31177fa82bc6013d77a228';
    public beauty: string = '5c8a6ccc0302b4647b7151d0';
    public transportation: string = '5c8a6ccc0302b4647b7151d0';
    public photo: string = '5d311798a82bc6013d77a236';
    public decoration: string = '5c8a6ccc0302b4647b7151d0';
    public honeymoon: string = '5c8a6ccc0302b4647b7151d0';
    public event: string = '5c8a6ccc0302b4647b7151d0';

    public getItemType(name: string): any {
        var typeId: string;
        if(name.toLowerCase() == 'auditorium') {
            typeId = this.auditorium
        } else if(name == 'Beauty'){
            typeId = this.beauty
        } else if(name == 'Transportation'){
            typeId = this.transportation
        } else if(name == 'Photo'){
            typeId = this.photo
        } else if(name == 'Decoration'){
            typeId = this.decoration
        } else if(name == 'Honeymoon'){
            typeId = this.honeymoon
        } else if(name == 'Event'){
            typeId = this.event
        }
        return typeId;
    }
}
