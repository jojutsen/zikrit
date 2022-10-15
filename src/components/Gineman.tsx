import Sande from './Sande'
import Sukses from './Sukses'
import { FC, useState } from 'react'
import { send } from '../libs/fetcher'
import { Online } from 'react-detect-offline'

const Gineman: FC = () => {
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState<number>(1)

  const submit = async (evt: any) => {
    evt.preventDefault()

    const value = String(message).trim()
    if (value.length === 0) return

    setStatus(2)
    const response = await send(value)

    setStatus(3)

    setTimeout(() => {
      setStatus(1)
    }, 20_000)

    return response !== null ? setMessage('') : ''
  }

  const update = (evt: any) => {
    setMessage(evt.target.value)
  }

  return (
    <>
      <Sande />

      <Online>
        {status === 3 ? (
          <Sukses />
        ) : (
          <form onSubmit={submit}>
            <textarea
              value={message}
              onChange={update}
              name="gineman"
              placeholder="fafifu wasweswos disini!"
              disabled={status === 2}
            ></textarea>

            <small>
              <span className="wigatos">*</span>
              <span>
                aku gabakal tau siapa yang ngirim ini, kecuali pake insting wkwk
              </span>
            </small>

            <button className="kintun" onClick={submit}>
              {status === 2 ? 'Otw ...' : 'Lempar!'}
            </button>
          </form>
        )}
      </Online>
    </>
  )
}

export default Gineman
