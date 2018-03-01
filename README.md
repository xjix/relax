@r14c/async-utils(1) -- async implementations of common utility functions
=========================================================================

**don't block**

`async-utils` is designed to work with the new async syntax to allow you to write non-blocking
code that looks synchronous. functions like `Array.prototype.map()` are very useful, but
operating over large collections will always block. `async-utils` rethinks a full range of
useful tools to work *with* the event loop rather than against it.

## Modules

<dl>
<dt><a href="#module_fork">fork</a></dt>
<dd></dd>
<dt><a href="#module_to">to</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#exp_module_fork--fork">fork(predicate, fns)</a> ⇒ <code>any</code> ⏏</dt>
<dd><p>execute a chain of async operations using the return value of each function
as the argument for the next</p>
</dd>
<dt><a href="#exp_module_to--to">to(promise)</a> ⇒ <code>Promise</code> ⏏</dt>
<dd></dd>
</dl>

<a name="module_fork"></a>

## fork
<a name="exp_module_fork--fork"></a>

### fork(predicate, fns) ⇒ <code>any</code> ⏏
execute a chain of async operations using the return value of each function
as the argument for the next

**Kind**: global method of [<code>fork</code>](#module_fork)  

| Param | Type |
| --- | --- |
| predicate | <code>any</code> | 
| fns | <code>Array.&lt;function(value)&gt;</code> | 

<a name="module_to"></a>

## to
<a name="exp_module_to--to"></a>

### to(promise) ⇒ <code>Promise</code> ⏏
**Kind**: global method of [<code>to</code>](#module_to)  

| Param | Type |
| --- | --- |
| promise | <code>Promise</code> | 

