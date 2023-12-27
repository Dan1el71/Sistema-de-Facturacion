import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async createUser(
        name: string,
        user: string,
        password: string,
        id_profile: number,
        middle_name?: string
      ) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const validProfileID = await prisma.profile.findFirst({
          where: {
            id_profile,
          },
        })
        if (validProfileID) {
          return await prisma.user.create({
            data: {
              name,
              middle_name,
              user,
              password: hashedPassword,
              id_profile,
            },
          })
        } else {
          return null
        }
      },

      async updateUser(
        id_user: number,
        name: string,
        user: string,
        password: string,
        id_profile: number,
        middle_name?: string
      ) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const validProfileID = await prisma.profile.findFirst({
          where: {
            id_profile,
          },
        })
        if (validProfileID) {
          return await prisma.user.update({
            where: {
              id_user,
            },
            data: {
              name,
              middle_name,
              user,
              password: hashedPassword,
              id_profile,
            },
            select: {
              id_user: true,
              name: true,
              middle_name: true,
              user: true,
              id_profile: true,
            },
          })
        } else {
          return null
        }
      },

      async validPassword(password: string, hashedPasswod: string) {
        return await bcrypt.compare(password, hashedPasswod)
      },
    },
    client: {
      async createClient(
        identification_type: number,
        identification: string,
        social_reason: string,
        state: string
      ) {
        const validTypeID = await prisma.identification_Type.findFirst({
          where: {
            identification_type,
          },
        })

        if (validTypeID) {
          return await prisma.client.create({
            data: {
              identification_type,
              identification,
              social_reason,
              state,
            },
          })
        } else return null
      },
    },
  },
})

export default prisma
