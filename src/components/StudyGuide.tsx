import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  FileCode2,
  Users2,
  BookOpen,
  CheckCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Subject } from '../types/interview';

interface StudyGuideProps {
  onStartSubject: (subject: Subject) => void;
}

export const StudyGuide: React.FC<StudyGuideProps> = ({ onStartSubject }) => {
  const [activeTab, setActiveTab] = useState<Subject>('Java');

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Quick Interview Study Guide &amp; Cheat Sheets
        </h2>
        <p className="text-sm text-slate-500">
          High-yield architectural summaries and conceptual cheat sheets to review before your round.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {(
          [
            { id: 'Java' as Subject, label: 'Java Architecture', icon: Code2 },
            { id: 'C' as Subject, label: 'C Systems & Pointers', icon: Cpu },
            { id: 'Python' as Subject, label: 'Python Internals', icon: FileCode2 },
            { id: 'HR' as Subject, label: 'HR & STAR Framework', icon: Users2 },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {activeTab === 'Java' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Java Interview Mastery
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Core execution flow, memory regions, and OOP principles
                </p>
              </div>
              <button
                onClick={() => onStartSubject('Java')}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Practice Java</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  JVM Memory Layout
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Heap:</strong> Stores all created objects and instance variables. Divided into Young (Eden, S0, S1) and Old generations.
                  <br />
                  <strong>Stack:</strong> Stores method frames, local primitive variables, and references to heap objects. One stack per thread.
                  <br />
                  <strong>Metaspace (Java 8+):</strong> Stores class definitions and metadata in native OS RAM.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  String Pool &amp; Immutability
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  String literals reside in the String Constant Pool in Heap. Once created, character sequences cannot change.
                  <br />
                  <strong>StringBuilder:</strong> Fast, non-synchronized string concatenation for single threads.
                  <br />
                  <strong>StringBuffer:</strong> Thread-safe string concatenation with synchronized methods.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  HashMap Internals &amp; Contract
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Array of Node buckets. Bucket index: <code>hash(key) &amp; (n-1)</code>.
                  <br />
                  Collisions handled via linked lists; when collisions &ge; 8 in a bucket, it treeifies to a Red-Black Tree (O(log n)).
                  <br />
                  <strong>Golden Contract:</strong> If <code>a.equals(b)</code> is true, then <code>a.hashCode() == b.hashCode()</code> MUST be true.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Concurrency: Volatile vs Synchronized
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>volatile:</strong> Guarantees visibility (flushes to main RAM) and prevents CPU instruction reordering. Does NOT guarantee atomicity (e.g. <code>i++</code>).
                  <br />
                  <strong>synchronized:</strong> Mutual exclusion lock (monitor) ensuring only one thread enters at a time.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'C' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  C Programming &amp; Systems Cheat Sheet
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pointers, heap allocation, memory segments, and defensive coding
                </p>
              </div>
              <button
                onClick={() => onStartSubject('C')}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Practice C</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Pointer Operators &amp; Arithmetic
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <code>&amp;x</code> yields memory address of x.
                  <br />
                  <code>*ptr</code> dereferences ptr to read or update the target memory.
                  <br />
                  <code>ptr + 1</code> advances by <code>1 * sizeof(*ptr)</code> bytes, not 1 byte!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  malloc() vs calloc() vs free()
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <code>malloc(bytes)</code> allocates raw uninitialized garbage memory.
                  <br />
                  <code>calloc(num, size)</code> allocates memory initialized to zero.
                  <br />
                  Always check for <code>NULL</code> and call <code>free(ptr)</code> followed by <code>ptr = NULL;</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Struct vs Union &amp; Alignment
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>struct:</strong> Each member has its own separate memory offset.
                  <br />
                  <strong>union:</strong> All members share the exact same starting byte (size = max member).
                  <br />
                  Order members from largest to smallest to minimize alignment padding.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Storage Classes &amp; Static
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>static local variable:</strong> Retains value between function invocations across lifetime.
                  <br />
                  <strong>static global/function:</strong> Restricts linkage to current .c translation unit (file-scoped).
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Python' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Python Core &amp; CPython Internals
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Memory model, decorators, GIL concurrency, and idiomatic patterns
                </p>
              </div>
              <button
                onClick={() => onStartSubject('Python')}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Practice Python</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Global Interpreter Lock (GIL)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A mutex in CPython that permits only one OS thread to execute bytecode at once.
                  <br />
                  <strong>I/O-bound:</strong> Threads/asyncio work well as GIL is released on I/O.
                  <br />
                  <strong>CPU-bound:</strong> Use <code>multiprocessing</code> to spawn distinct processes and bypass GIL.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Decorators &amp; Generators
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Decorator:</strong> Higher-order function wrapping another function. Preserves metadata via <code>@functools.wraps</code>.
                  <br />
                  <strong>Generator:</strong> Uses <code>yield</code> to produce values lazily on demand with O(1) memory footprint.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Mutable vs Immutable
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Immutable:</strong> int, float, str, tuple, bool, frozenset.
                  <br />
                  <strong>Mutable:</strong> list, dict, set, bytearray.
                  <br />
                  <em>Warning:</em> Never use mutable default arguments like <code>def fn(arg=[])</code>!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Memory: Reference Counting &amp; Cycles
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deallocation is instantaneous when reference count drops to 0.
                  <br />
                  Cyclic references (e.g. A points to B and B points to A) are swept periodically by the generational cyclic GC.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'HR' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  HR &amp; Behavioral Round Playbook
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Frameworks for storytelling, leadership, and emotional intelligence
                </p>
              </div>
              <button
                onClick={() => onStartSubject('HR')}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Practice HR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  The STAR Method (Crucial)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Situation (20%):</strong> Context, team size, challenge.
                  <br />
                  <strong>Task (10%):</strong> Your explicit responsibility and objective.
                  <br />
                  <strong>Action (50%):</strong> Step-by-step actions you personally took.
                  <br />
                  <strong>Result (20%):</strong> Concrete metric, resolution, and takeaway.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  &quot;Tell Me About Yourself&quot; (2 Mins)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Present:</strong> Current degree/role and core programming strengths.
                  <br />
                  <strong>Past:</strong> 1-2 major technical projects and proudest achievements.
                  <br />
                  <strong>Future:</strong> Why this specific company and position excites you today.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Conflict Resolution Rules
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Focus on project outcomes, code standards, or user experience—never personal hostility.
                  <br />
                  Demonstrate active listening and willingness to test assumptions with data.
                  <br />
                  Emphasize &quot;disagree and commit&quot; once a team decision is finalized.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Questions to Ask the Interviewer
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  &quot;What does success look like in the first 90 days?&quot;
                  <br />
                  &quot;What is the biggest engineering hurdle your team faces this year?&quot;
                  <br />
                  &quot;How does the engineering team balance shipping features vs reducing technical debt?&quot;
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
