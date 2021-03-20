import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const group = { create: { name: 'grupo 1' } }
  const comments = { create: { contain: '123' } }
  const posts = {
    create: {
      title: 'Hello World',
      published: true,
      comments,
    },
  }

  await prisma.user.create({
    data: {
      name: 'Teste 2',
      email: 'asd@prisma.io',
      password: '123456',
      posts,
      group,
    },
  })

  const allUsers = await prisma.user.findMany({ include: { posts: true } })

  console.dir(allUsers, { depth: null })
}
main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
