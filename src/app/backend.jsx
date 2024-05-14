import Image from "next/image";
import styles from "./page.module.css";
import prisma from "../../prisma/index";



const getUser = async (id) =>
await prisma.users.findUnique({
  select: {
    email: true,
    name: true,
    userCode: true,
  },
  where: { id },
});



export default async function backend() {
  const user = await getUser(1);
  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          {user.name}&nbsp;
          {user.name}&nbsp;
        </p>
       
      </div>

      

      
    </main>
  );
}
