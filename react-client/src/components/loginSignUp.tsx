import { useAuth } from '@/context/authContext';
import { LoginFormData, loginSchema, RegisterFormData, registerSchema } from '@/validation/authSchema';
import { Box, Button, Dialog, Field, Fieldset, Heading, Input, Portal, Switch, Tabs, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { Saira } from 'next/font/google';
import { Controller, useForm } from 'react-hook-form'
import { toaster } from './ui/toaster';
import { AxiosError } from 'axios';

const saira = Saira({
	subsets: ['latin']
})

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onBlur',
	});

	const { userLogin } = useAuth()

	const handleLogin = async (data: LoginFormData) => {
		try {
			await userLogin(data);
			toaster.create({
				title: "Logged in successfully",
				type: "success",
				duration: 3000,
			});
		} catch (e) {
			const error = e as AxiosError;
			toaster.create({
				title: "Error",
				description: error?.message || "Unknown error",
				type: "error",
				duration: 3000,
			});
		}
	};

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(handleLogin)}
			p={6}
			borderWidth="1px"
			borderRadius="lg"
			shadow="md"
			bg="white"
			maxW="sm"
			mx="auto"
			mt={10}
		>
			<VStack gap={4}>
				<Heading size="xl">	Welcome back!</Heading>
				<Fieldset.Root>
					<Fieldset.Content>
						<Field.Root invalid={!!errors.username}>
							<Field.Label>Username</Field.Label>
							<Input
								data-testid='login-username'
								{...register("username")}
								p={4}
							/>
							<Field.ErrorText>{errors.username?.message}</Field.ErrorText>

						</Field.Root>

						<Field.Root invalid={!!errors.password}>
							<Field.Label>Password</Field.Label>
							<Input
								data-testid='login-password'
								{...register("password")}
								p={4}
								type='password'
							/>
							<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
						</Field.Root>

					</Fieldset.Content>
				</Fieldset.Root>

				<Button
					colorPalette={'green'}
					loading={isSubmitting}
					type="submit"
					width="full"
					data-testid='login-button'
				>
					Log in
				</Button>
			</VStack>
		</Box>
	);
}

const Register = () => {
	const {
		register,
		reset,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			role: 'USER',
		},
		mode: 'onBlur',
	});

	const { userRegister } = useAuth()

	const handleRegister = async (data: RegisterFormData) => {
		try {
			await userRegister(data);
			reset();
			toaster.create({
				title: "Signed up successfully.",
				description: "You can now log in with your credentials.",
				type: "success",
				duration: 3000,
			});
		} catch (e) {
			const error = e as AxiosError;
			toaster.create({
				title: "Error",
				description: error?.message || "Unknown error",
				type: "error",
				duration: 3000,
			});
		}
	};

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(handleRegister)}
			p={6}
			borderWidth="1px"
			borderRadius="lg"
			shadow="md"
			bg="white"
			maxW="sm"
			mx="auto"
			mt={10}
		>
			<VStack gap={4}>
				<Heading size="xl">	Join us!</Heading>
				<Fieldset.Root>
					<Fieldset.Content>
						<Field.Root invalid={!!errors.username}>
							<Field.Label>Username</Field.Label>
							<Input
								{...register("username")}
								p={4}
							/>
							<Field.ErrorText>{errors.username?.message}</Field.ErrorText>

						</Field.Root>

						<Field.Root invalid={!!errors.password}>
							<Field.Label>Password</Field.Label>
							<Input
								{...register("password")}
								p={4}
								type='password'
							/>
							<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
						</Field.Root>

						<Field.Root invalid={!!errors.role} orientation={"horizontal"}>
							<Field.Label>Is Admin</Field.Label>
							<Controller
								control={control}
								name="role"
								render={({ field: { onChange } }) => (
									<Switch.Root>
										<Switch.HiddenInput
											onChange={e => onChange(e.target.checked ? "ADMIN" : "USER")
											}
										/>
										<Switch.Control />
									</Switch.Root>
								)}
							/>
							<Field.ErrorText>{errors.role?.message}</Field.ErrorText>
						</Field.Root>

					</Fieldset.Content>
				</Fieldset.Root>

				<Button
					colorPalette={'green'}
					loading={isSubmitting}
					type="submit"
					width="full"
					name='sign-up'
				>
					Sign up
				</Button>
			</VStack>
		</Box>
	);
}

const AuthDialog = () => {
	return <Dialog.Root placement={"top"} motionPreset={"slide-in-bottom"}>
		<Dialog.Trigger asChild>
			<Button
				data-testid='openLoginDialog'
				variant="outline"
				borderColor={"green.600"}
				borderWidth={2}
				p={4}
			>
				Login / Sign Up
			</Button>
		</Dialog.Trigger>
		<Portal>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content mt={10}>
					<Dialog.CloseTrigger />
					<Dialog.Header>
						<Dialog.Title />
					</Dialog.Header>
					<Dialog.Body p={10} className={saira.className}>
						<Tabs.Root defaultValue="login" variant="plain">
							<Tabs.List bg="bg.muted" rounded="l3" p="1" w={"100%"}>
								<Tabs.Trigger value="login" w={"50%"} justifyContent={"center"}>
									Log in
								</Tabs.Trigger>
								<Tabs.Trigger value="register" w={"50%"} justifyContent={"center"}>
									Sign Up
								</Tabs.Trigger>
								<Tabs.Indicator rounded="l2" />
							</Tabs.List>
							<Tabs.Content value="login">
								<Login />
							</Tabs.Content>
							<Tabs.Content value="register">
								<Register />
							</Tabs.Content>
						</Tabs.Root>
					</Dialog.Body>
					<Dialog.Footer />
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog.Root>
}

const LoginSignUp = () => {
	const { user, userLogout } = useAuth();

	return (
		<>
			{user ? (
				<Button
					variant="outline"
					borderColor={"green.600"}
					borderWidth={2}
					p={4}
					onClick={userLogout}
				>
					Logout
				</Button>
			) : (
				<AuthDialog />
			)
			}
		</>

	)
}

export default LoginSignUp