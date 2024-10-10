import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions"; // Import authOptions from the new file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
