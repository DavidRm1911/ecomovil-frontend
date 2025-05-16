export class Plan {
  name: string;
  postMonth: string;
  assistanceType: Array<string>;
  price: number;
  featured : boolean;

  constructor( plan:{
    name?: string,
    postMonth?: string,
    assistanceType?: Array<string>,
    price?: number,
    featured?: boolean}) {
    this.name = plan.name || "";
    this.postMonth = plan.postMonth || "";
    this.assistanceType= plan.assistanceType || [];
    this.price = plan.price || 0;
    this.featured = plan.featured || false;
  }

}

