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
<dt><a href="#module_microTask">microTask</a></dt>
<dd></dd>
<dt><a href="#module_to">to</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#exp_module_fork--fork">fork(fns, predicate)</a> ⇒ <code>any</code> ⏏</dt>
<dd><p>execute a chain of async operations using the return value of each function
as the argument for the next</p>
</dd>
<dt><a href="#exp_module_microTask--microTask">microTask(fn)</a> ⏏</dt>
<dd><p>schedule a task to run on nextTick</p>
</dd>
<dt><a href="#exp_module_to--to">to(promise)</a> ⇒ <code>Promise</code> ⏏</dt>
<dd></dd>
</dl>

<a name="module_fork"></a>

## fork
<a name="exp_module_fork--fork"></a>

### fork(fns, predicate) ⇒ <code>any</code> ⏏
execute a chain of async operations using the return value of each function
as the argument for the next

**Kind**: global method of [<code>fork</code>](#module_fork)  

| Param | Type |
| --- | --- |
| fns | <code>Array.&lt;function(value)&gt;</code> | 
| predicate | <code>any</code> | 

<a name="module_microTask"></a>

## microTask
<a name="exp_module_microTask--microTask"></a>

### microTask(fn) ⏏
schedule a task to run on nextTick

**Kind**: global method of [<code>microTask</code>](#module_microTask)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="module_to"></a>

## to
<a name="exp_module_to--to"></a>

### to(promise) ⇒ <code>Promise</code> ⏏
**Kind**: global method of [<code>to</code>](#module_to)  

| Param | Type |
| --- | --- |
| promise | <code>Promise</code> | 

