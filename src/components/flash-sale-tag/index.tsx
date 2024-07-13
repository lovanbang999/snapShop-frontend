import styles from './styles.module.css'

export default function FlashSaleTag({ title = 'Flash Sale' }: { title?: string }) {
  return (
    <div className='relative w-fit'>
      <div className="relative z-10 py-2 pl-4 pr-2 bg-gradient-to-r from-[#20AAC2] to-[#0F515C]">
        <p className="text-white text-lg font-bold md:text-3xl">{title}</p>
      </div>
      <div style={{ position: 'absolute', top: '3px', left: '-11px', background: '#20AAC2', transform: 'rotate(315deg)' }} className={styles.triangle}></div>
      <div style={{ position: 'absolute', bottom: '4px', left: '-11px', background: '#20AAC2', transform: 'rotate(315deg)' }} className={styles.triangle}></div>

      <div style={{ position: 'absolute', top: '4px', right: '-8px', background: '#0F515C', transform: 'rotate(135deg)' }} className={styles.triangle}></div>
      <div style={{ position: 'absolute', bottom: '4px', right: '-9px', background: '#0F515C', transform: 'rotate(135deg)' }} className={styles.triangle}></div>
    </div>
  )
}
