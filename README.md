# @r14c/async-utils

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
| fns | <code>Array.&lt;function()&gt;</code> | 

<a name="module_to"></a>

## to
<a name="exp_module_to--to"></a>

### to(promise) ⇒ <code>Promise</code> ⏏
**Kind**: global method of [<code>to</code>](#module_to)  

| Param | Type |
| --- | --- |
| promise | <code>Promise</code> | 

