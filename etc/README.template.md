async-utils(1) -- async implementations of common utility functions
===================================================================

**don't block**

`async-utils` is designed to work with the new async syntax to allow you to write non-blocking
code that looks synchronous. functions like `Array.prototype.map()` are very useful, but
operating over large collections will always block. `async-utils` rethinks a full range of
useful tools to work *with* the event loop rather than against it.

## reference 
