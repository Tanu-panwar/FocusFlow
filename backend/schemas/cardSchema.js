const { z } =require("zod");

module.exports.cardSchema = z.object({
    term: z.string().min(1, "Front text is required"),
    defination: z.string().min(1, "Back text is required"),
    userId: z.string().min(1, "User ID is required"),
    deckName: z.array(z.string()).optional(), // ✅ Optional array of strings
    isImage: z.string().nullable().optional(), // ✅ Optional and allows null
});
