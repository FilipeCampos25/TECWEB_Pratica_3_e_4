function Message({ type = 'info', children }) {
  if (!children) {
    return null;
  }

  return (
    <div className={`message message-${type}`} role="alert">
      {children}
    </div>
  );
}

export default Message;
