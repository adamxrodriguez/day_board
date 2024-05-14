import { NextApiRequest, NextApiResponse } from 'next'
 import prisma from '../../../../../prisma/index'


export async function GET(request, { params }) {
  const id = params.id 
  const user = await getUser(parseInt(id))
  return Response.json( user )
}
  
  const getUser = async (id) =>
  await prisma.users.findUnique({
    select: {
      email: true,
      name: true,
      userCode: true,
    },
    where: { id },
  });


