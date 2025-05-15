const { z } =require("zod");

module.exports.deckSchema = z.object({
    name: z.string().min(1, "name  is required"),
    description: z.string().optional(),
    userId: z.string().min(1, "User ID is required"),
});
