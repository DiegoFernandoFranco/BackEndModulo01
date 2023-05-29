import z from 'zod';

// const idValidation = z.string().length(24).regex(/^[a-fA-F0-9]/)
const idValidation = z.string().length(24).regex(/^[a-fA-F0-9]+$/)
// const idValidation = z.string().length(24)


export default idValidation;




// const idValidation = z.string().length(24).regex(/^[a-fA-F0-9]{24}$/)

// if (idValidation.message === 'Invalid') {
//     console.log('regex error')
// }
// const idValidation = z.object({
//     id: z.string().max(24)
// });