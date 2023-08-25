import { BustCupSizeEnum } from '../../enums/bustCupSize.enum';
import { BodyTypeEnum } from '../../enums/bodyType.enum';
import { EyeColorEnum } from '../../enums/eyeColor.enum';
import { EyewearEnum } from '../../enums/eyewear.enum';
import { HairColorEnum } from '../../enums/hairColor.enum';
import { HairLengthEnum } from '../../enums/hairLength.enum';
import { HairTypeEnum } from '../../enums/hairType.enum';

export interface ProfileAppearanceFormModel {
  body: {
    bust?: number;
    bust_cup?: BustCupSizeEnum;
    height?: number;
    hips?: number;
    shoe_size?: number;
    type?: BodyTypeEnum;
    waist?: number;
    weight?: number;
  };
  eye: {
    color?: EyeColorEnum;
    wear?: EyewearEnum;
  };
  hair: {
    color?: HairColorEnum;
    length?: HairLengthEnum;
    type?: HairTypeEnum;
  };
}
