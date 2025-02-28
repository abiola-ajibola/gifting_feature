export class CreatePropertyDto {
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly price: number;
  readonly location: string;
  readonly isAvailable: boolean;
}
