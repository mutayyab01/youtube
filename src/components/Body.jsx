import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='flex'>
      <div className="flex flex-col items-center w-20 h-screen bg-white border-r border-gray-200 py-4">
      <nav className="flex flex-col items-center gap-6 mt-4 w-full">
        {/* Home */}
        <a href="#" className="flex flex-col items-center w-full px-2 py-2 text-xs hover:bg-gray-100 rounded-lg">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAaNJREFUWEft1j1rFVEQxvFfQKxMKQEhFoFgkDRaSYiFkMYm2Gg+ROxE/AyCpfkQeSlCCjuxCSkUjKAIglhYCGIjWAghYO6EvbJudvfsW0hhprw755n/mTn3OWfCGcfEGdfXF+AG/uBd1430AVjF86zwQ6x1gegKsIxt/nYwunAPO20hugAs4iUuFoodjH6/jddtINoCXMMbTFYU+Ylb+NQUog3AFN7iSkL822gUN/G9CURTgNjxHuabiOIDFvArld8E4AJeIWbfJnZxB4d1i1IA8X0d99tUzuVuYiXzilKJFMCzURsfdSw+XhYaj6s06gDyRtOTQaVRVQEUjaYvQKVRlQFUGU1fiFKjKgKkjKYvxAmjygNcwkdM962SWP8Vc/gdeXmAu3hxysXH8kvZffIPQFwuTxF3fMRlXB8IKDr7I9PaH+3+CeJM1D5IHmQmNARDaIUpnYg6HzgHCP/fqOh/fqbjlLozE1pbQ46gbKZ1Ixv8DJwD/B8diPff+4p/wSw+F761zT9ennoRzeBqodAXxIVSFm3zkwBD2HCtRqoDpw5wBA7JViHg9RY9AAAAAElFTkSuQmCC" alt="Home" srcset="" />
          <span className="mt-1">Home</span>
        </a>

        {/* Shorts */}
        <a href="#" className="flex flex-col items-center w-full px-2 py-2 text-xs hover:bg-gray-100 rounded-lg">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAsBJREFUWEfFl0uoTlEUx3835FFSIleeSR7hestMElLMPAYeGZiZuBRGHkkGQoQZA5LXRMkjlJgIZeCtvEkiCRFC9v+2T+125+y9zncHd9fX1/edtdf6rbXXXmudJjp4NXWwfRoF6AL0A5q9A+8Bff7UdagOQF9gKbAAmAF0ioz9df9fBc4Cx4BPFhgLQHdgLbAB6GlRCnwBtgN7gd+pPTmAScBJYHjG8BNgZInMY2AxcK9qfwpgOXAY6JwxfsZ7KUNlSxFY6QCPlz2sApgNXCg55zIdo53cNmBhAlT5MQu4FsuUAQzzIethOO9TwBJA34sy8t+AccCrUK4M4HTGm2L/P2AMoHO27tHtWJYCmALcNngukaPACi+rRK3KgVhdS5iUcQT2A6sNADrTEQ7guZe1RkDiO4H1hY0Y4B3Q3wBwCFgVyNUBeOiPrm17CDA4TpDEtVJdeBM83+wyfGbwuxcwIeFIb+BzDDANuGnw/qDhmPYAaxK6dBvuxwDzfR1PMaioDPGNp0quD/AaUAmvWnOAyzHAPOB8JgLyTH0htXYZZGTrYgwwFbiV0PwTGJjpchbvZWIycCcGGOAy+20CQElzN3qu5AvLq8V7qdAs8SEG0O8XwFBDIhYiKj66glpW7x8AYwsFcR3YAWxsEMDq/RZ3/bdWAeiMVd00cllWEQGr97+AQe4af6wC0P+73UTTarHu67+OwOq92vamUHdZN1QVU7KpMuaWWvB1N3C8zNx76XkGjAe+5wCKa3LDcBQCmA6sy5Aq9BPd7PAolkuNZOrbR6J+Ee9X51T4uyUANDdomj5RJpMbSuf6a1Y1DT/NDKxf/XDTVnYbAdCeUcA+QHNinXXONyRBVq5cBMKNalaaAdRIqhrND+AScAC4YqGtA1Do6+qallp3/Gak1zL1kuSLSJ0ktDjQbplGItBuo6GC/xUleSHOcEpjAAAAAElFTkSuQmCC" alt="Short" srcset="" />
          <span className="mt-1">Shorts</span>
        </a>

        {/* Subscriptions */}
        <a href="#" className="flex flex-col items-center w-full px-2 py-2 text-xs hover:bg-gray-100 rounded-lg">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAO1JREFUWEftlrEOAUEQhr97Mw+BUitKGlHxEqJWCuIR8C4qBY3+2ITiknU7s9k1F7mr/5v55t9/567A+CmM+9MCaBxYKI9LpNcAlEoAUW2RSNlYJW80wEk1Sljc8UnqHDAHCM+UQNHIDGivm9aHytA+BxyAWyJnbeWA3oVwDtX1/w2gD2wTA7iam78COABD4Cp0KrkDLis3YAKsBRBZAD59j8AAuNSAZAVwfR/AFFi90u67yj8BmAFLCwCzI7gD4xwh7AG7QLL3wEhxDbvv5SZaxe0mNP8YCRZbtCSYgejKMS828o8oZpDod8wdeALuCEghME/T7AAAAABJRU5ErkJggg==" alt="Subscription" srcset="" />
          <span className="mt-1">Subscriptions</span>
        </a>

        {/* You */}
        <a href="#" className="flex flex-col items-center w-full px-2 py-2 text-xs hover:bg-gray-100 rounded-lg">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABDtJREFUWEfFl2moVlUUhh8LojArnCKzycpUokKFiuxHETRQFEJUWmlhRQVRItqEgmUQzTQQNmBGNiDaRBRBUDSJcwRJVGYplUnzaON+ZO3LdnO+e74rQQsu3z17r73Ou9fwrnX68T9Lvx14/5nAMcA+wNA4vxn4AngHeL4vNrsFcBBwDXABsFfLC74FHgPuAj5rA9MGYF/gZmBqm6EO+w8DNwB6qFF6A3A8sAQYXJ18BXgVeBP4CPgTOBgYn9ZOAs6u9A2NYVvehKATAF29sDjwPXBncv/dwA8t3tgbmJn0pld6ZwHP1WebABwLvF0ovghM7vDiQ0JPT9SiV54FDo+NX4CjgfdLxRqAWf0e4C2UZ4BzKsu7ArNS1l8WleC2br4fuB34vdDvDzwRIXB5PXAk8GPWqQE8BEyLzZeBU6uXa3B1MnpohzB8CIwDfqr2V8S6y7dEYm5TKQGMTLf9ANgJsJQOA76uDJUAde/TsT8FOCX+V+fS6tyBAdwS/g3w+asagLV7YRw05osqI7sBPwfoptC8AJwO/J1CsXsK06/VeXnERFZuTUCuLQHsDHyTFPZIhGPGD0lu+qMyYFm+EWuG6ZFq//LEjA/E2gTgrWp/ALAJ8NdcGFECsH6tbeXeBOaqhhiXAC4BJJlSTMoHY0FdeaIW2fHqWBwNrMs5YN3qFmViytSlDYdNwJxcixsIxx5wRpwzBIarFvdzrzBvFmYAtyXjM0L7KGBtw2GXdPvFsWcSPpmyehdgUlExTUmYze0PbIiHG4F5GUCZgNZ5WcslFuO3JsevAaSxPaKhDLOqYLPt+XJJBvBoQnZRi/uykT1TGS1IQKTWUvSITcsk7iSW+F+xqTenZQDzgOtjw+z0Jm0yEDgglD4N7mg7Y1v/JJRuSiU7OwO4IqjUPRNF/m+T/YKyLWFJRRBtIq0/FUpWzfwMwCbxbmzcUSRkadAXSTSWoKzncy2vazQ1IKtka8O+5HZerEvZqzIAfx0a7P2ShVRpn89iA5F2peduRBuG9HHgnzhQkp3Na5jrZS+QRHSLUlLxddFA8ovlAt1oqW6MrDYXRiViObfopOpLRqdF9yuJ6p5MSCUAk+/jeMvncVu5YW5xZRlSpuxNzg+dPDtKyV7I8s1rw8PT23lAo/elDnhlWF9ZtFAz9+QYwboJgbPkS8EJ6us12VHpaUR1CHweFLOb5ZLlu5hk7PV9Ecf2ZYk9rZYs68JWz1jXNJI5ZjlASDiKw6Rt2sN9EQE4V9roFBPPajO8PdJpKB0LvFaA8IAj1+xo221A1LPfO0MoXwInNF2it7HcrBaENylFvvALyMHVP8v1uLidX0yO53bOLA6sJ9Y3z5vdfJhYBbkDtt283ndAmQNs6XSwDUA+Z15YHQ6pbWTkVG0FWFESUq/SLYDSiD1dV4+JMjMEzvoSkyGpB9n/HEDbpfq0/y+LLtAhxA+CpgAAAABJRU5ErkJggg==" alt="Profile" srcset="" />        <span className="mt-1">You</span>
        </a>

        {/* History */}
        <a href="#" className="flex flex-col items-center w-full px-2 py-2 text-xs hover:bg-gray-100 rounded-lg">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAt9JREFUWEftllmoT1EUxn8XGS9PiDJFIqUkomRI8WAqCpkiRZ5QUkpmeRKRFyRDyZxkKEqGkLx4kohEpgezq8zsr9a5bds5Z+97/XVf7qp/d9999lr722t9a6iigaWqge+nEUBdPdAWmAdMAboBnYCfwHPgPnAaOAa8TQ1tHoDLpnwJWGfrlu7vWmd4CaB1mXwH9gLrgacxIHkAfpnSUWA6MBg46H69A2OvgMdANdAn56IvwBzzSCGOGID9wEmguVl4COwGtP/Ss9oOGAqMAJYFXpLXthchKAOg13UBmpryFmAl8Dni1h7AAWC4d24icCZPrwyAf34RsDMwMMp4oe01wBXvu+wK7Abb+2QhfBGCSAFwEdjoKWYknQqIJxKtj+e88CwwzvZFzPn1AVCkkwKgM3APUPpKujsQT3yDKR4oAjANOGIftVb+58lMyyJ9WwpsiwFQbMukLiHI7NQAbQDVltExAJH7az+nekAKd4G+wGug/f8AsNwVpM0lyM8DYy2FW1UKwBBn9IYruU2sHyjWGSdCLFetLnwEVLRqJY+Ee4BewAdgUiQeyoTDHohZ9n+opotVshWKfjEAYuliOzQQuB0BMdnqQTPgBzA7AKEeok4pEdgZMQBjgAt2SJVsdQIrBUJpmJXt8cA50/PJqkKkglQaAjWe99ZQ1Nf7A88SQChcJ4DrwARAqdcCuAkMMH31lj9sFQ0kq6yfS++ay9+RRrQYDjWgW4BasWSXu3CBrdWg5oYGigCI2WK4mC7RcKGGkyqyu8K18U2m8NV1yJ55niwbyboaa1XBNKQodur17yIopHcIGOadKyzVsZlQ859Pmjf2MnXIRwbMx7MQ2Aq09jb/qv8xEoYP1AC6w80D6my+fHNt+I6lXkegQzAJiQeqCyJmocQ8kCnqReKBxivle5ko3vtsGKnXUFpmXH1dxNRvkMVZ4JRaD6wWnPrXsTyV6RU5lxqCilyWZ6QRwG9/U48hWcP1UAAAAABJRU5ErkJggg==" alt="History" srcset="" />        <span className="mt-1">History</span>
        </a>
      </nav>
    </div>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Body