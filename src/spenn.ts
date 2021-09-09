export class Spenn {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public price: number,
        public image: string,
        public category: string,
        public featured: boolean,
        public quantity: number,
        public date: Date,
        public user: string,
        public comments: Comment[],
        public likes: number,
        public dislikes: number,
        public userLikes: string[],
        public userDislikes: string[],
        public userComments: string[]
    ) { }

    public static fromJSON(json: any): Spenn {
        return new Spenn(
            json.id,
            json.name,
            json.description,
            json.price,
            json.image,
            json.category,
            json.featured,
            json.quantity,
            json.date,
            json.user,
            json.comments,
            json.likes,
            json.dislikes,
            json.userLikes,
            json.userDislikes,
            json.userComments
        );
    }

    public static fromJSONArray(json: any): Spenn[] {
        return json.map(Spenn.fromJSON);
    }
}
