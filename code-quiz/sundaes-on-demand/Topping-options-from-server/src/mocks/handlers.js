import { rest } from 'msw';


export const handlers = [
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(
            ctx.json([
                {name: 'Chocolate', imagePath: '/images/chocolate.png'},
                {name: 'Vanilha', imagePath: '/images/vanilha.png'},

            ])
        )
    }),
]