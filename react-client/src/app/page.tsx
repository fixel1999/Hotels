"use client"

import { useAuth } from "@/context/authContext";
import { AbsoluteCenter, Button, VStack } from "@chakra-ui/react";

export default function Home() {
  const { userRegister, userLogin, userLogout } = useAuth();

  const handleRegister = () => {
    userRegister({
      username: "fixel",
      password: "123446",
      role: "USER"
    })
    userRegister({
      username: "fixel2",
      password: "123456",
      role: "ADMIN"
    })
  }

  const handleLoginUser = () => {
    userLogin({
      username: 'fixel',
      password: "123446"
    })
  }

  const handleLoginAdmin = () => {
    userLogin({
      username: 'fixel2',
      password: "123456"
    })
  }

  const handleFakeLogin = () => {
    userLogin({
      username: 'fixel2',
      password: "12347890"
    })
  }

  const handleLogout = () => {
    userLogout();
  }

  return (
    <>
      <AbsoluteCenter>
        <VStack gap={2} w={"10vw"}>
          <Button w={"100%"} onClick={handleRegister}>
            Register
          </Button>
          <Button w={"100%"} onClick={handleFakeLogin}>
            FakeLogin
          </Button>
          <Button w={"100%"} onClick={handleLoginUser}>
            Login as User
          </Button>
          <Button w={"100%"} onClick={handleLoginAdmin}>
            Login as Admin
          </Button>
          <Button w={"100%"} onClick={handleLogout}>
            Logout
          </Button>
        </VStack>
      </AbsoluteCenter>
    </>
  );
}
