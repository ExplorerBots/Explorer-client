import Link from 'next/link'
import { FC, PropsWithChildren, SetStateAction } from 'react'
import styles from './LinkItem.module.scss'

interface ILinkItem {
   href: string
   title: string
   state?: boolean
   onclick: (value: SetStateAction<boolean>) => void
}

const LinkItem: FC<PropsWithChildren<ILinkItem>> = ({ href, title, onclick, state }) => {
   return <>
      <Link className={styles.item} href={href} onClick={() => onclick(!state)}>
         {title}
      </Link>
   </>
}

export default LinkItem