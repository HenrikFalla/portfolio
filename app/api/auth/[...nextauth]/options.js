import GitHubProvider from 'next-auth/providers/github';
import { getUsers } from '@/app/api/(neon)/actions/actions';

export const options = {
	// pages: {
	//     signIn: "/auth/signin",
	//     signOut: "/auth/signout",
	//     error: "/auth/error",
	//     verifyRequest: "/auth/verify-request",
	//     newUser: "/auth/new-user",
	// },
	providers: [
		GitHubProvider({
			// profile(profile) {

			// },
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callback: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log('signIn callback', {
				user,
				account,
				profile,
				email,
				credentials,
			});
			console.log('Getting users from database');
			const users = await getUsers();
			console.log('Users from database', users);
			users.map((u) => {
				console.log('User', u.email);
				console.log('User email', user.email);
				if (u.email == user.email) {
					console.log('User found');
					return true;
				} else {
					console.log('User not found');
					return false;
				}
			});
		},
		// async jwt({ token, user, trigger, session }) {
		// 	if (user) {
		// 		console.log('jwt callback', { token, user, session });
		// 		return {
		// 			...token,
		// 			id: user?.id,
		// 			firstName: user?.firstName,
		// 			lastName: user?.lastName,
		// 			description: user?.description,
		// 			role: user?.role,
		// 		};
		// 	} else if (trigger) {
		// 		if (session?.firstName) {
		// 			token.firstName = session?.firstName;
		// 		}
		// 		if (session?.lastName) {
		// 			token.lastName = session?.lastName;
		// 		}
		// 		if (session?.description) {
		// 			token.description = session?.description;
		// 		}
		// 		if (session?.role) {
		// 			token.role = session?.role;
		// 		}
		// 		return token;
		// 	} else {
		// 		return token;
		// 	}
		// },
		// async session({ session, token }) {
		// 	// console.log("session callback", { token, user, session });
		// 	return {
		// 		...session,
		// 		user: {
		// 			...session.user,
		// 			id: token?.id,
		// 			firstName: token?.firstName,
		// 			lastName: token?.lastName,
		// 			description: token?.description,
		// 			role: token?.role,
		// 		},
		// 	};
		// },
	},
	secret: process.env.NEXTAUTH_SECRET,
	// session: {
	// 	strategy: 'jwt',
	// },
};
