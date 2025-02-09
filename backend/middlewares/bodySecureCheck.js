export const detectMaliciousContent = (req, res, next) => {
    // Skip processing if the request has no body (e.g., GET requests)
    if (!req.body || typeof req.body !== "object") {
      return next();
    }
  
    // Convert body to string for regex checking
    const jsonString = JSON.stringify(req.body);
  
    // Dangerous input patterns (XSS, SQL Injection, NoSQL Injection, Command Injection)
    const dangerousPatterns = /<script|<\/script|onerror|onload|javascript:|eval\(|document\.|window\.|(\b(SELECT|UPDATE|DELETE|INSERT|DROP|UNION|ALTER|CREATE|EXEC|MERGE|DECLARE)\b.*(FROM|INTO|TABLE|DATABASE|WHERE|SET))|(;|\||&|`|\$\(.*\)|\b(cat|ls|rm|wget|curl|echo|whoami|chmod|chown|mkfs|shutdown|reboot|kill|killall)\b)|(\b(\$ne|\$where|\$gt|\$lt|\$regex|\$options)\b)|(\.\.\/|\.\.\\|\/etc\/passwd|\/var\/log)|(\"?\$[a-zA-Z]+\s*\"\?)|(\"isAdmin\"\s*:\s*true)/i;
  
    if (dangerousPatterns.test(jsonString)) {
      return res.status(400).json({ message: "Malicious content detected in request body" });
    }
  
    next();
  };