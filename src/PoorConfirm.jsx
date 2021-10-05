/* eslint-disable react/prop-types */
import React, { memo } from 'react'

const buttonStyles = {
  fontSize: '1rem',
  padding: '6px 20px',
  background: 'tomato',
  border: 'none',
  fontFamily: 'inherit',
  cursor: 'pointer'
}

const PoorConfirm = memo(function PoorConfirm({
  closeConfirm,
  options: {
    open,
    title = 'Are you sure?',
    content = 'Some additional questions',
    actions = (
      <React.Fragment>
        <button
          type='button'
          onClick={() => {
            window.alert('Yay')
            closeConfirm()
          }}
          style={buttonStyles}
        >
          Ok
        </button>
        <button
          type='button'
          onClick={closeConfirm}
          style={{
            ...buttonStyles,
            marginLeft: '0.5rem'
          }}
        >
          No
        </button>
      </React.Fragment>
    )
  }
}) {
  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 2000
      }}
    >
      <div
        onClick={closeConfirm}
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          position: 'fixed',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fff',
          boxShadow: '0px 2px 10px rgb(0 0 0 / 10%)',
          padding: '1rem 1.5rem',
          zIndex: 2000,
          borderRadius: '0.5rem',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <span
          tabIndex={0}
          onClick={closeConfirm}
          role='button'
          style={{
            position: 'absolute',
            top: '0.25rem',
            right: '0.25rem',
            background: 'tomato',
            borderRadius: '100rem',
            width: '1.5rem',
            height: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.5rem',
            fontFamily: 'inherit'
          }}
        >
          &times;
        </span>

        <h4
          style={{
            paddingRight: '20px',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
            fontFamily: 'inherit'
          }}
        >
          {title}
        </h4>
        <p style={{ fontFamily: 'inherit' }}>{content}</p>
        <div style={{ marginTop: '1rem' }}>{actions}</div>
      </div>
    </div>
  )
})

PoorConfirm.propTypes = {}

export default PoorConfirm
