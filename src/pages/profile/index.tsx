import { Profile } from "@/components/features/profile";
import { SEO } from "@/configs/seo.config";
import { getServerSession } from "next-auth";
import { DefaultSeo } from "next-seo";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "@/libs/prisma";
import { User } from "@prisma/client";

interface ProfilePageProps {
  me: User;
}

const ProfilePage = ({ me }: ProfilePageProps) => {
  console.log(me);

  return (
    <>
      <DefaultSeo {...SEO} title="Thông tin cá nhân" />
      <Profile me={me} />
    </>
  );
};

export default ProfilePage;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const me = await prisma.user.findFirst({
    where: { email: session?.user?.email },
    select: {
      id: true,
      username: true,
      email: true,
      account: true,
      address: true,
      bank: true,
      birthday: true,
      phoneNumber: true,
      workPlace: true,
    },
  });

  return {
    props: {
      me: JSON.parse(JSON.stringify(me)),
    },
  };
}
