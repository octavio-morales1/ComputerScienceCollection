#define N 2  // 2 (resp. 3) - requires setting max_depth to 12000 (resp. 22000)
#define B 2

byte mutexE = 1;
byte mutexL = 1;
byte barrier = 0;
byte barrier2 = 0;

byte c[N];  // array for counting cycles
byte enter=0;
byte leaving=0;

inline acquire(s) {
  skip;
end1:atomic {
    s>0;
    s--
  }
}

inline release(s) {
  s++
}

inline absolute(inp,outp) { // absolute value of inp placed in outp
  if
    :: inp>0 -> outp = inp
    :: else -> outp = -inp
  fi
}

active[N] proctype P() {
  byte i;
  byte j;

  for (i: 1..100 ) {
    // complete
    acquire(mutexE);
    enter++;
    if (enter == B) {
      barrier = B;
      enter = 0;
    }
    release(mutexE);

    acquire(barrier);
    barrier--;

    c[_pid]++;  // Increment cycle count for this process

    printf("%d reached at cycle %d\n",_pid, c[_pid]);
    atomic {
      // assertion here
      for (j : 0..N-1) {
        assert(c[_pid] - c[j] <= 1);
      }
    };

    printf("%d leaves at cycle %d\n",_pid, c[_pid]);
    // complete
    acquire(mutexL);
    leaving++;
    if (leaving == B) {
      barrier2 = B;
      leaving = 0;
    }
    release(mutexL);

    acquire(barrier2);
    barrier2--;

  }
}